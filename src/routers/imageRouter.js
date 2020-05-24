const express = require("express");
const EditorImage = require("../models/image");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//###################### POST ############################
router.post("/images", checkJwt, async (req, res) => {
  const image = new EditorImage({
    ...req.body,
    owner: req.user._id
  });

  try {
    const result = await image.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/images", async (req, res) => {
  try {
    const images = await EditorImage.find({});
    res.send(images);
  } catch (e) {
    res.status(500).send();
  }
});

//######################## GET ###########################
router.get("/user/images", checkJwt, async (req, res) => {
  //const userId = req.user._id;
  try {
    await req.user.populate("images").execPopulate();
    res.send(req.user.images);
  } catch (e) {
    res.status(500).send(error);
  }
});

module.exports = router;
