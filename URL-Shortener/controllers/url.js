const shortID = require("short-id");

const URL = require("../controllers/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is required" });
  const shortId = shortID(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
}

module.exports = { handleGenerateNewShortURL };
