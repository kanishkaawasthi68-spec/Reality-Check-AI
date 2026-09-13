const Groq = require("groq-sdk");

// Lazily construct the client so a missing GROQ_API_KEY only breaks the
// verification endpoints (with a clean error message) instead of crashing
// the entire server on startup.
let groq = null;

function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  return groq;
}

const VALID_VERDICTS = [
  "TRUE",
  "MOSTLY_TRUE",
  "PARTIALLY_TRUE",
  "MOSTLY_FALSE",
  "FALSE",
  "UNCERTAIN",
];

function formatEvidenceForPrompt(evidence) {
  if (!evidence.length) {
    return "No relevant search results were found.";
  }

  return evidence
    .map((item, index) => {
      const dateLine = item.date ? `Date: ${item.date}\n` : "";

      return `[Source ${index + 1}]
Title: ${item.title}
Domain: ${item.domain} (${item.tierLabel})
${dateLine}URL: ${item.link}
Snippet: ${item.snippet}`;
    })
    .join("\n\n");
}

async function verifyClaim(claim, evidence) {
  try {
    const client = getClient();
    const evidenceBlock = formatEvidenceForPrompt(evidence);

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are Reality Check AI, an evidence-based fact-checking assistant.

You must reason ONLY from the numbered sources provided by the user message.
You are strictly forbidden from:
- Inventing evidence that is not in the provided sources.
- Inventing or fabricating URLs, titles, or sources.
- Treating a search snippet as unquestionable truth without noting uncertainty.
- Answering purely from your own prior/background knowledge when sources are thin or absent.

You must:
- Distinguish between evidence (what a source actually states) and inference (your interpretation).
- Consider whether sources agree or conflict with each other.
- Prefer official/primary and well-established sources over unverified ones when they disagree, but do not blindly trust a source just because it is famous.
- Return "UNCERTAIN" whenever the evidence is insufficient, absent, stale relative to the claim, or too weak to justify a confident verdict. Do not force a decision.
- Never claim certainty. Confidence should reflect the actual strength/agreement of the evidence, not a guess.
- Only cite source URLs that were given to you. Never fabricate a URL.

Return ONLY valid JSON. No markdown, no commentary outside the JSON object.

The JSON schema is:
{
  "verdict": one of "TRUE" | "MOSTLY_TRUE" | "PARTIALLY_TRUE" | "MOSTLY_FALSE" | "FALSE" | "UNCERTAIN",
  "confidence": integer 0-100,
  "summary": "One or two sentence plain-language summary of the verdict.",
  "reason": "A concise explanation (under 80 words) of why this verdict was reached, grounded in the sources.",
  "supportingEvidence": ["short bullet point grounded in a source", ...],
  "contradictingEvidence": ["short bullet point grounded in a source", ...],
  "sources": [{"title": "...", "link": "...", "domain": "...", "date": "..." }]
}

Rules for the JSON fields:
- "supportingEvidence" and "contradictingEvidence" can be empty arrays if there is nothing relevant on that side.
- "sources" must only include entries that correspond exactly to the numbered sources you were given (same title/link/domain). Do not include a source you did not use in your reasoning.
- If there are no usable sources at all, return verdict "UNCERTAIN", low confidence, and explain that insufficient evidence was found.
`,
        },

        {
          role: "user",
          content: `
Claim to verify:
"${claim}"

Retrieved evidence (numbered sources, may include unrelated or low-quality results — use judgement):
${evidenceBlock}

Analyze the claim strictly using the evidence above, following the rules in your instructions. Return ONLY the JSON object described in your instructions.
`,
        },
      ],

      temperature: 0.2,
      max_completion_tokens: 1400,
    });

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    return content.trim();
  } catch (error) {
    console.error(
      "Groq Error:",
      error?.response?.data || error?.message || error
    );

    throw error;
  }
}

async function verifyArticle(articleTitle, articleText, evidence) {
  try {
    const client = getClient();
    const evidenceBlock = formatEvidenceForPrompt(evidence);

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are Reality Check AI, an evidence-based fact-checking assistant reviewing a news/article page.

First, identify the single most important, checkable factual claim made by the article (not opinions, not routine background detail).

Then verify that claim strictly using the numbered independent sources provided by the user message, following the same evidence rules as claim verification:
- Never invent evidence, sources, or URLs.
- Distinguish evidence from inference.
- Return "UNCERTAIN" when evidence is insufficient or the independent sources do not clearly confirm or contradict the article.
- Prefer official/primary and well-established independent sources.
- Never claim certainty; confidence must reflect actual evidence strength.

Return ONLY valid JSON, no markdown, matching this schema:
{
  "extractedClaim": "The main factual claim identified in the article.",
  "verdict": one of "TRUE" | "MOSTLY_TRUE" | "PARTIALLY_TRUE" | "MOSTLY_FALSE" | "FALSE" | "UNCERTAIN",
  "confidence": integer 0-100,
  "summary": "One or two sentence plain-language summary.",
  "reason": "Concise explanation (under 80 words) grounded in the independent sources.",
  "supportingEvidence": ["..."],
  "contradictingEvidence": ["..."],
  "sources": [{"title": "...", "link": "...", "domain": "...", "date": "..." }]
}
`,
        },
        {
          role: "user",
          content: `
Article title: "${articleTitle || "Untitled"}"

Article text (may be truncated):
${articleText}

Independent search evidence (numbered sources):
${evidenceBlock}

Identify the article's main factual claim and verify it strictly against the independent evidence above. Return ONLY the JSON object described in your instructions.
`,
        },
      ],

      temperature: 0.2,
      max_completion_tokens: 1600,
    });

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    return content.trim();
  } catch (error) {
    console.error(
      "Groq Error (article):",
      error?.response?.data || error?.message || error
    );

    throw error;
  }
}

module.exports = {
  verifyClaim,
  verifyArticle,
  VALID_VERDICTS,
};
