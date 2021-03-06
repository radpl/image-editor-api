const express = require("express");
const User = require("../models/user");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//public
router.get("/api/public", (req, res) => {
  res.send({
    msg: "You have accessed public endpoint!"
  });
});

//secured
router.get("/api/secured", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

module.exports = router;