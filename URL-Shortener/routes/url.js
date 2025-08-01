const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetUrlByID,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetUrlByID);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
