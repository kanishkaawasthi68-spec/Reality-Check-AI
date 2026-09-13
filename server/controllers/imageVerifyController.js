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

    // Input-shaped problems (corrupt/unsupported image data) are the
    // user's to fix; anything else is treated as a server-side failure.
    const isInputProblem = /unsupported image format|invalid image|corrupt/i.test(
      error.message || ""
    );

    return res.status(isInputProblem ? 400 : 500).json({
      success: false,
      message: isInputProblem
        ? "This file doesn't appear to be a valid image. Please try a different file."
        : error.message || "Image verification failed. Please try again.",
    });
  }
}

module.exports = {
  imageVerifyController,
};