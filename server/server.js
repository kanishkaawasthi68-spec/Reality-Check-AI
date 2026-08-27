require("dotenv").config();

const express = require("express");
const cors = require("cors");

const verifyRoutes = require("./routes/verify");
const imageVerifyRoutes = require("./routes/imageVerify");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Reality Check AI Backend is Running 🚀");
});

// Text Claim Verification
app.use("/verify", verifyRoutes);

// Image Verification
app.use("/image-verify", imageVerifyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});