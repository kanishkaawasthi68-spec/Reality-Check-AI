const { fetchArticle } = require("../services/articleService");
const { searchEvidence } = require("../services/searchService");
const { verifyArticle, VALID_VERDICTS } = require("../services/groqService");
const { cleanJson } = require("../utils/cleanJson");

function normalizeVerdict(rawVerdict) {
  const verdict = (rawVerdict || "").toString().toUpperCase().replace(/\s+/g, "_");
  return VALID_VERDICTS.includes(verdict) ? verdict : "UNCERTAIN";
}

function sanitizeSources(claimedSources, retrievedEvidence) {
  const retrievedByLink = new Map(retrievedEvidence.map((item) => [item.link, item]));
  const safeSources = [];

  if (Array.isArray(claimedSources)) {
    for (const source of claimedSources) {
      const link = typeof source === "string" ? source : source?.link;

      if (link && retrievedByLink.has(link)) {
        const original = retrievedByLink.get(link);

        safeSources.push({
          title: original.title,
          link: original.link,
          domain: original.domain,
          date: original.date,
          tierLabel: original.tierLabel,
        });
      }
    }
  }

  if (safeSources.length === 0) {
    return retrievedEvidence.slice(0, 3).map((item) => ({
      title: item.title,
      link: item.link,
      domain: item.domain,
      date: item.date,
      tierLabel: item.tierLabel,
    }));
  }

  return safeSources;
}

async function urlVerifyController(req, res) {
  try {
    const { url } = req.body;

    if (!url || !url.trim()) {
      return res.status(400).json({
        message: "Please provide a URL to verify.",
      });
    }

    let article;

    try {
      article = await fetchArticle(url.trim());
    } catch (fetchError) {
      // Do not pretend to have verified an article that could not be retrieved.
      return res.status(422).json({
        message: fetchError.message || "This article could not be retrieved.",
      });
    }

    // Search using the article title (falls back to a text excerpt).
    const searchSeed = article.title || article.text.slice(0, 120);
    const evidence = await searchEvidence(searchSeed);

    const aiResponse = await verifyArticle(article.title, article.text, evidence);
    const cleanedResponse = cleanJson(aiResponse);

    let parsedResult;

    try {
      parsedResult = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("JSON Parse Error (article):", error);
      console.error("Raw AI Response:", aiResponse);

      return res.status(502).json({
        message: "The AI response could not be understood. Please try again.",
      });
    }

    const verdict = normalizeVerdict(parsedResult.verdict);
    const confidence = Math.max(
      0,
      Math.min(100, Math.round(Number(parsedResult.confidence) || 0))
    );

    return res.json({
      sourceUrl: article.url,
      articleTitle: article.title,
      extractedClaim: parsedResult.extractedClaim || "",
      verdict,
      confidence,
      summary: parsedResult.summary || "",
      reason: parsedResult.reason || "No explanation was returned.",
      supportingEvidence: Array.isArray(parsedResult.supportingEvidence)
        ? parsedResult.supportingEvidence.slice(0, 6)
        : [],
      contradictingEvidence: Array.isArray(parsedResult.contradictingEvidence)
        ? parsedResult.contradictingEvidence.slice(0, 6)
        : [],
      sources: sanitizeSources(parsedResult.sources, evidence),
      evidenceCount: evidence.length,
    });
  } catch (error) {
    console.error("URL Verification Error:", error);

    return res.status(500).json({
      message: "Something went wrong while verifying this URL. Please try again shortly.",
    });
  }
}

module.exports = {
  urlVerifyController,
};
