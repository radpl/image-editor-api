const express = require("express");
const Logo = require("../models/logo");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//######################## POST ##########################
router.post("/api/logos", async (req, res) => {
  //console.log(req.body);
  const logos = req.body.logos.map(item => {
    const split = item.split(',');
    const base64string = split[1];
    return Buffer.from(base64string, 'base64');
  });
  //console.log(logo);
  const logo = new Logo({
    logos: logos,
    image: req.body.image
  });

  try {
    const result = await logo.save();
    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/api/logos/:id", async (req, res) => {
  const _id = req.params.id;
  console.log("/api/logos/" + _id)
  //console.log(_id);
  try {
    const list = await Logo.find({ image: _id });
    if (list.length > 0) {
      const logos = list[0].logos.map(lg => {
        const b = new Buffer(lg);
        return "data:image/png[jpg];base64," + b.toString('base64');
      });
      res.send(logos);
    }
    res.status(404).send('Not found');
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
