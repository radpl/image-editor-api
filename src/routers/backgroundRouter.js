const express = require("express");
const Background = require("../models/background");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//######################## POST ##########################
router.post("/api/backgrounds", async (req, res) => {
  //console.log(req.body);
  const backgrounds = req.body.backgrounds.map(item => {
    const split = item.split(',');
    const base64string = split[1];
    return Buffer.from(base64string, 'base64');
  });
  //console.log(logo);
  const background = new Background({
    backgrounds: backgrounds,
    image: req.body.image
  });

  try {
    const result = await background.save();
    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/api/backgrounds/:id", async (req, res) => {
  const _id = req.params.id;
  console.log("/api/backgrounds/" + _id);

  try {
    const list = await Background.find({ image: _id });
    if (list.length > 0) {
      const backgrounds = list[0].backgrounds.map(bg => {
        const b = new Buffer(bg);
        return "data:image/png[jpg];base64," + b.toString('base64');
      });
      res.send(backgrounds);
    }
    res.status(404).send('Not found');
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
