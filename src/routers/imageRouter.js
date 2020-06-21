const express = require("express");
const EditorImage = require("../models/image");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//###################### POST ############################
router.post("/api/images", checkJwt, async (req, res) => {
  //console.log(req.body);
  const data = req.body['thumbnail'];
  const split = data.split(',');
  const base64string = split[1];
  const buffer = Buffer.from(base64string, 'base64');

  const image = new EditorImage({
    ...req.body.image,
    owner: req.body.user._id,
    thumbnail: buffer
  });

  try {
    const result = await image.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/api/:id/images", async (req, res) => {
  const _id = req.params.id;
  //console.log(_id);
  try {
    const images = await EditorImage.find({ owner: _id });
    res.send(images);
  } catch (e) {
    res.status(500).send();
  }
});

//######################## GET ###########################
router.get("/api/user/images", checkJwt, async (req, res) => {
  //const userId = req.user._id;
  try {
    await req.user.populate("images").execPopulate();
    res.send(req.user.images);
  } catch (e) {
    res.status(500).send(error);
  }
});

module.exports = router;
