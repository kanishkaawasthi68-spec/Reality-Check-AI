const { searchNews } = require("../services/searchService");
const { verifyClaim } = require("../services/groqService");
const { cleanJson } = require("../utils/cleanJson");

async function verifyController(req, res) {
  try {
    const { claim } = req.body;

    if (!claim || !claim.trim()) {
      return res.status(400).json({
        message: "Please enter a claim.",
      });
    }

    // Search latest news
    const searchResults = await searchNews(claim);

    const searchContext =
      searchResults.length > 0
        ? searchResults
            .map(
              (item, index) =>
                `${index + 1}. ${item.title}\n${item.snippet}\n${item.link}`
            )
            .join("\n\n")
        : "No recent search results found.";

    // AI Verification
    const aiResponse = await verifyClaim(claim, searchContext);

    // Clean AI Response
    const cleanedResponse = cleanJson(aiResponse);

    let parsedResult;

    try {
      parsedResult = JSON.parse(cleanedResponse);
    } catch (error) {
      return res.status(500).json({
        message: "AI returned invalid JSON.",
        raw: aiResponse,
      });
    }

    return res.json({
      ...parsedResult,
      sources:
        parsedResult.sources?.length > 0
          ? parsedResult.sources
          : searchResults.slice(0, 3).map((item) => item.link),
    });
  } catch (error) {
    console.error("Verification Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  verifyController,
};