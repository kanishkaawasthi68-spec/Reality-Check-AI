require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(
  process.env.GROQ_API_KEY
    ? "✅ Groq API Key Loaded"
    : "❌ Groq API Key Not Loaded"
);

const PORT = 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Reality Check AI Backend is Running 🚀");
});

// Verify Route
app.post("/verify", async (req, res) => {
  try {
    const { claim } = req.body;

    if (!claim) {
      return res.status(400).json({
        message: "Please enter a claim.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an AI fact checker. Always return ONLY valid JSON. Do not add markdown or extra text.",
        },
        {
          role: "user",
          content: `
Analyze the following claim:

"${claim}"

Return ONLY this JSON format:

{
  "verdict": "True",
  "confidence": "95%",
  "reason": "Explain the result in simple English.",
  "sources": [
    "Source 1",
    "Source 2",
    "Source 3"
  ]
}
`,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content.trim();

    let parsedResult;

    try {
      parsedResult = JSON.parse(aiResponse);
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON.",
        raw: aiResponse,
      });
    }

    res.json(parsedResult);

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