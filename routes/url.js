const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const config = require("config");
// const cors = require('cors');
const Url = require("../models/Url");

// let options = {
//   origin: 'http://localhost:5000',
//   optionsSuccessStatus: 200 
// }

// @route     POST /api/v1/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  let genId = uuidv4();
  let id = genId.substring(0, 3).slice(0, -1);
  const longUrl = req.body.longUrl;
  const baseUrl = config.get("baseUrl")
  // console.log(req.body.longUrl);

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();
  const shortUrl = baseUrl + "/" + urlCode + id;
  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        await url
          .updateOne({
            shortUrl,
            urlCode: urlCode+id,
          })
          .then(async () => {
            let docId = url._id;
            await Url.findOne({ _id: docId }).then((u) => res.json(u));
          });
        console.log(shortUrl);
      } else {
        url = new Url({
          longUrl,
          shortUrl,
          urlCode: urlCode+id,
          date: new Date(),
        });

        await url.save();
        await console.log("Generated new url!", url);

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

router.get("/links/:id", async (req, res) => {
  let { id } = req.params;
  let url = await Url.findOne({ _id: id });
  if (url) {
    res.json(url);
    // let docId = url._id;
    // await Url.findOne({ _id: docId }).then(u => res.json(u))

    // console.log(shortUrl);
  } else return;
});

module.exports = router;
