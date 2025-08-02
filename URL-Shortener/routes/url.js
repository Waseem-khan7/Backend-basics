const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetUrlByID,
  handleGetAnalytics,
} = require("../controllers/url");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/", authMiddlewares, handleGenerateNewShortURL);
router.get("/:shortId", handleGetUrlByID);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
