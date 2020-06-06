const express = require("express");
const EditorImage = require("../models/image");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//###################### POST ############################
router.post("/api/images", checkJwt, async (req, res) => {
  console.log(req.body);
  const image = new EditorImage({
    ...req.body.image,
    owner: req.body.user._id
  });

  try {
    const result = await image.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/api/images", async (req, res) => {
  try {
    const images = await EditorImage.find({});
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
