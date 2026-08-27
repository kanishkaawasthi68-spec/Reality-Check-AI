const express = require("express");
const multer = require("multer");

const {
  imageVerifyController,
} = require("../controllers/imageVerifyController");

const router = express.Router();

// Temporary upload storage
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

// POST /image-verify
router.post(
  "/",
  upload.single("image"),
  imageVerifyController
);

module.exports = router;