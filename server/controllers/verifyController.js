const { searchEvidence } = require("../services/searchService");
const { verifyClaim, VALID_VERDICTS } = require("../services/groqService");
const { cleanJson } = require("../utils/cleanJson");

const MAX_CLAIM_LENGTH = 500;

function sanitizeSources(claimedSources, retrievedEvidence) {
  // Only trust sources that match something we actually retrieved.
  // This prevents the model from fabricating URLs/titles.
  const retrievedByLink = new Map(
    retrievedEvidence.map((item) => [item.link, item])
  );

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

  // If the model didn't reference any valid sources, fall back to the
  // top retrieved evidence so the user still sees something real.
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

function normalizeVerdict(rawVerdict) {
  const verdict = (rawVerdict || "").toString().toUpperCase().replace(/\s+/g, "_");
  return VALID_VERDICTS.includes(verdict) ? verdict : "UNCERTAIN";
}

async function verifyController(req, res) {
  try {
    const { claim } = req.body;

    if (!claim || !claim.trim()) {
      return res.status(400).json({
        message: "Please enter a claim.",
      });
    }

    if (claim.trim().length > MAX_CLAIM_LENGTH) {
      return res.status(400).json({
        message: `Claim is too long. Please keep it under ${MAX_CLAIM_LENGTH} characters.`,
      });
    }

    // Retrieve evidence from multiple targeted searches.
    const evidence = await searchEvidence(claim.trim());

    // Ask the model to reason over the retrieved evidence only.
    const aiResponse = await verifyClaim(claim.trim(), evidence);
    const cleanedResponse = cleanJson(aiResponse);

    let parsedResult;

    try {
      parsedResult = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("JSON Parse Error:", error);
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
    console.error("Verification Error:", error);

    return res.status(500).json({
      message: "Something went wrong while verifying this claim. Please try again shortly.",
    });
  }
}

module.exports = {
  verifyController,
};
