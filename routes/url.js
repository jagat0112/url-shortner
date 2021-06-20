const express = require("express");
const config = require("config");
const validUrl = require("valid-url");
const ids = require("short-id");
const Url = require("../Model/Url");

const router = express.Router();

router.post("/", async (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).send("Not a valid URI");
  }
  const url = await Url.findOne({ longUrl });
  if (url) {
    return res.status(200).send(url.shortUrl);
  }

  const urlCode = ids.generate();
  try {
    const newUrl = await Url.create({
      longUrl,
      urlCode,
      shortUrl: config.get("baseUrl") + "/" + urlCode,
    });
    res.status(200).json(newUrl.shortUrl);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
