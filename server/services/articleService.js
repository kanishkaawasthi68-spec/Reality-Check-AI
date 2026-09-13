const axios = require("axios");
const dns = require("dns").promises;
const cheerio = require("cheerio");

const FETCH_TIMEOUT_MS = 10000;
const MAX_HTML_BYTES = 3 * 1024 * 1024; // 3 MB
const MIN_EXTRACTED_CHARS = 200;

// ==========================================================
// SSRF PROTECTION
// ==========================================================

const BLOCKED_HOSTNAMES = new Set(["localhost"]);

function isPrivateIp(ip) {
  return (
    /^127\./.test(ip) ||
    /^10\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^169\.254\./.test(ip) ||
    /^0\./.test(ip) ||
    /^::1$/.test(ip) ||
    /^fc00:/i.test(ip) ||
    /^fe80:/i.test(ip) ||
    (() => {
      const match = ip.match(/^172\.(\d+)\./);
      return match && Number(match[1]) >= 16 && Number(match[1]) <= 31;
    })()
  );
}

async function assertSafeUrl(rawUrl) {
  let parsed;

  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error("Please provide a valid URL.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http/https URLs are supported.");
  }

  const hostname = parsed.hostname.toLowerCase();

  if (BLOCKED_HOSTNAMES.has(hostname)) {
    throw new Error("This URL cannot be verified.");
  }

  try {
    const lookups = await dns.lookup(hostname, { all: true });

    for (const { address } of lookups) {
      if (isPrivateIp(address)) {
        throw new Error("This URL cannot be verified.");
      }
    }
  } catch (error) {
    if (error.message === "This URL cannot be verified.") throw error;
    throw new Error("This URL could not be resolved.");
  }

  return parsed;
}

// ==========================================================
// ARTICLE TEXT EXTRACTION
// ==========================================================

function extractArticle(html) {
  const $ = cheerio.load(html);

  $("script, style, noscript, header, footer, nav, aside, iframe, form").remove();

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").first().text() ||
    "";

  // Prefer <article>, fall back to the largest block of <p> text.
  let mainText = "";

  const articleTag = $("article").first();

  if (articleTag.length) {
    mainText = articleTag.find("p").map((_, el) => $(el).text()).get().join("\n\n");
  }

  if (mainText.trim().length < MIN_EXTRACTED_CHARS) {
    mainText = $("p").map((_, el) => $(el).text()).get().join("\n\n");
  }

  const cleanText = mainText.replace(/\s+\n/g, "\n").replace(/[ \t]+/g, " ").trim();

  return {
    title: title.trim(),
    text: cleanText,
  };
}

// ==========================================================
// FETCH + EXTRACT
// ==========================================================

async function fetchArticle(rawUrl) {
  const safeUrl = await assertSafeUrl(rawUrl);

  let response;

  try {
    response = await axios.get(safeUrl.toString(), {
      timeout: FETCH_TIMEOUT_MS,
      maxContentLength: MAX_HTML_BYTES,
      maxRedirects: 3,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RealityCheckAI/1.0; +https://reality-check-ai)",
        Accept: "text/html,application/xhtml+xml",
      },
      validateStatus: (status) => status >= 200 && status < 400,
    });
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Fetching this page timed out. Please try again.");
    }

    throw new Error(
      "This page could not be accessed. It may be offline, blocked, or require a login."
    );
  }

  const contentType = response.headers["content-type"] || "";

  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
    throw new Error("This URL does not appear to be a readable article page.");
  }

  const { title, text } = extractArticle(response.data);

  if (text.length < MIN_EXTRACTED_CHARS) {
    throw new Error(
      "Not enough readable text could be extracted from this page. It may be paywalled, mostly non-text content, or not an article."
    );
  }

  // Cap the amount of article text we pass downstream to keep prompts
  // reasonably sized.
  const truncatedText = text.slice(0, 6000);

  return {
    url: safeUrl.toString(),
    title,
    text: truncatedText,
  };
}

module.exports = {
  fetchArticle,
};
