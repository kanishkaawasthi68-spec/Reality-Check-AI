const axios = require("axios");
const { extractDomain, getSourceTier } = require("../utils/sourceQuality");

const SERPER_TIMEOUT_MS = 8000;

// ==========================================================
// LOW LEVEL SERPER CALLS
// ==========================================================

async function serperRequest(endpoint, query) {
  if (!process.env.SERPER_API_KEY) {
    throw new Error("SERPER_API_KEY is missing");
  }

  const response = await axios.post(
    `https://google.serper.dev/${endpoint}`,
    {
      q: query,
      num: 6,
    },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: SERPER_TIMEOUT_MS,
    }
  );

  return response.data;
}

function normalizeResult(item) {
  if (!item?.link) return null;

  const domain = extractDomain(item.link);
  const tier = getSourceTier(item.link);

  return {
    title: item.title || domain || "Untitled source",
    link: item.link,
    snippet: item.snippet || "",
    date: item.date || null,
    domain,
    tier: tier.tier,
    tierLabel: tier.label,
  };
}

// ==========================================================
// BUILD TARGETED SEARCH QUERIES FOR A CLAIM
// ==========================================================
// Keeps the number of queries small and deliberate rather than
// firing off many redundant searches (cost/latency control).

function buildSearchQueries(claim) {
  const trimmed = claim.trim();

  const queries = [trimmed];

  // A query nudged toward independent/fact-check reporting.
  queries.push(`${trimmed} fact check`);

  // A query nudged toward official/primary confirmation.
  queries.push(`${trimmed} official statement OR government OR report`);

  return queries;
}

// ==========================================================
// RUN MULTIPLE TARGETED SEARCHES AND MERGE RESULTS
// ==========================================================

async function searchEvidence(claim) {
  const queries = buildSearchQueries(claim);

  const searchPromises = queries.flatMap((q) => [
    serperRequest("search", q).catch((error) => {
      console.error("Serper /search error:", error?.response?.data || error.message);
      return null;
    }),
    serperRequest("news", q).catch((error) => {
      console.error("Serper /news error:", error?.response?.data || error.message);
      return null;
    }),
  ]);

  const responses = await Promise.all(searchPromises);

  const rawResults = [];

  for (const data of responses) {
    if (!data) continue;

    if (Array.isArray(data.organic)) {
      rawResults.push(...data.organic);
    }

    if (Array.isArray(data.news)) {
      rawResults.push(...data.news);
    }
  }

  // Deduplicate by link
  const seen = new Set();
  const deduped = [];

  for (const item of rawResults) {
    const normalized = normalizeResult(item);

    if (!normalized) continue;
    if (seen.has(normalized.link)) continue;

    seen.add(normalized.link);
    deduped.push(normalized);
  }

  // Prefer higher-quality / more relevant sources, cap the total
  // so the prompt stays small and cheap.
  deduped.sort((a, b) => a.tier - b.tier);

  return deduped.slice(0, 10);
}

// Backwards-compatible name used elsewhere in the codebase.
async function searchNews(query) {
  try {
    const data = await serperRequest("news", query);
    return data.news || [];
  } catch (error) {
    console.error("Serper Error:", error?.response?.data || error?.message || error);
    return [];
  }
}

module.exports = {
  searchNews,
  searchEvidence,
};
