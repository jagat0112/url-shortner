const express = require("express");
const Url = require("../Model/Url");

const router = express.Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const url = await Url.findOne({ urlCode: code });
  !url && res.status(403).send("URL not Valid");
  res.redirect(url.longUrl);
});

module.exports = router;
