const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function verifyClaim(claim, searchContext) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing");
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are Reality Check AI, an expert AI fact-checking assistant.

Return ONLY valid JSON.

Rules:
- Verdict must be exactly one of:
  True
  False
  Misleading
  Uncertain

- Confidence must be a number between 0 and 100.
- Reason must be under 50 words.
- Sources must always be an array.
- Never return markdown.
- Never write anything outside JSON.
`,
        },

        {
          role: "user",
          content: `
Claim:
"${claim}"

Search Results:
${searchContext}

Analyze the claim using the search results above.

Rules:
- If the search results strongly support the claim, use "True".
- If the search results strongly contradict the claim, use "False".
- If evidence is mixed, use "Misleading".
- If there is not enough reliable information, use "Uncertain".
- Use only URLs present in the search results.
- Confidence must be between 0 and 100.
- Keep the reason short.

Return ONLY this JSON:

{
  "verdict": "True",
  "confidence": 95,
  "reason": "Short explanation.",
  "sources": []
}
`,
        },
      ],

      temperature: 0.2,
      max_completion_tokens: 1024,
    });

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    console.log("Groq Response:", content);

    return content.trim();
  } catch (error) {
    console.error(
      "Groq Error:",
      error?.response?.data || error?.message || error
    );

    throw error;
  }
}

module.exports = {
  verifyClaim,
};