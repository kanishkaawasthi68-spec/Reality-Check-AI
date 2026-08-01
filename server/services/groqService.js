const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function verifyClaim(claim, searchContext) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are Reality Check AI, an expert AI fact-checking assistant.

Rules:
- Return ONLY valid JSON.
- Never return markdown.
- Never explain outside JSON.
- Verdict must be ONLY one of:
  True
  False
  Misleading
  Uncertain
- Confidence must be a NUMBER between 0 and 100.
- Keep the reason short and easy to understand.
- If reliable sources are unavailable, return an empty array.
`,
      },
      {
        role: "user",
        content: `
Claim:
"${claim}"

Latest Search Results:
${searchContext}

Instructions:
- Analyze the claim using ONLY the search results above.
- Use only the URLs from the search results in the sources array.
- If the search results strongly support the claim, verdict = True.
- If they strongly contradict the claim, verdict = False.
- If evidence is mixed, verdict = Misleading.
- If there isn't enough reliable information, verdict = Uncertain.
- Confidence must be a number between 0 and 100.
- Keep the reason under 50 words.

Return ONLY valid JSON in this format:

{
  "verdict": "True",
  "confidence": 95,
  "reason": "Short explanation.",
  "sources": [
    "https://source1.com",
    "https://source2.com"
  ]
}
`,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
}

module.exports = {
  verifyClaim,
};