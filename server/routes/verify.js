const express = require("express");
const { verifyController } = require("../controllers/verifyController");

const router = express.Router();

router.post("/", verifyController);

module.exports = router;