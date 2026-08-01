function cleanJson(aiResponse) {
  if (!aiResponse) return "";

  return aiResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

module.exports = {
  cleanJson,
};