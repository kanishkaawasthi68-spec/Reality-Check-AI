require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Check Groq API Key
console.log(
  process.env.GROQ_API_KEY
    ? "✅ Groq API Key Loaded"
    : "❌ Groq API Key Not Loaded"
);

// ✅ Add this block
console.log(
  process.env.SERPER_API_KEY
    ? "✅ Serper API Key Loaded"
    : "❌ Serper API Key Not Loaded"
);


async function searchNews(query) {
  try {
    const response = await axios.post(
      "https://google.serper.dev/news",
      {
        q: query,
        num: 5,
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.news || [];
  } catch (error) {
    console.error("Serper Error:", error.response?.data || error.message);
    return [];
  }
}


const PORT = 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Reality Check AI Backend is Running 🚀");
});

// Verify Route
app.post("/verify", async (req, res) => {
  try {
    const { claim } = req.body;

    if (!claim || !claim.trim()) {
      return res.status(400).json({
        message: "Please enter a claim.",
      });
    }

    // Search latest information
    const searchResults = await searchNews(claim);
    console.log("Search Results:");
    console.log(searchResults);

    // Convert results into readable text
    const searchContext =
  searchResults.length > 0
    ? searchResults
        .map(
          (item, index) =>
            `${index + 1}. ${item.title}\n${item.snippet}\n${item.link}`
        )
        .join("\n\n")
    : "No recent search results found.";
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
You are given a claim and the latest Google search results.

Claim:
"${claim}"

Latest Search Results:
${searchContext}

Instructions:
- Analyze the claim using ONLY the search results above.
- Use the provided search results as your primary evidence.
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
  "reason": "Short explanation in simple English.",
  "sources": [
    "https://source1.com",
    "https://source2.com",
    "https://source3.com"
  ]
}
`,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content.trim();
    console.log("AI Response:");
    console.log(aiResponse);

    let parsedResult;

    try {
      parsedResult = JSON.parse(aiResponse);
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON.",
        raw: aiResponse,
      });
    }

    res.json({
      ...parsedResult,
      sources: searchResults.slice(0, 3).map((item) => item.link),
    });
  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});