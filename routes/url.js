const express = require("express");
const config = require("config");
const ids = require("short-id");
const Url = require("../Model/Url");

const router = express.Router();

router.post("/", async (req, res) => {
  const { longUrl } = req.body;

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

router.get('/', async (req,res)=>{
  const urls = await Url.find()
  if(!urls){
    res.status(403).send("URL NOT FOUND")

  }
  res.status(200).send(urls)
})

module.exports = router;
