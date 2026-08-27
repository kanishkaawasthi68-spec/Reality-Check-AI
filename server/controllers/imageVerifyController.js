const { detectImage } = require("../services/imageDetectionService");

async function imageVerifyController(req, res) {
  try {
    // Check image
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    console.log("Image received:", req.file.originalname);

    // Send image to detection service
    const result = await detectImage(req.file.path);

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Image Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image verification failed.",
    });
  }
}

module.exports = {
  imageVerifyController,
};