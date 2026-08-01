const axios = require("axios");

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
    console.error(
      "Serper Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

module.exports = {
  searchNews,
};