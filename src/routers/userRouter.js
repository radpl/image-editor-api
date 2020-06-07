const express = require("express");
const User = require("../models/user");
const checkJwt = require("../middleware/auth");

const router = new express.Router();

//######################## GET ###########################
router.get("/api/users/me", checkJwt, async (req, res) => {
  res.send(req.user);
});
//######################## POST ##########################
router.post("/api/users/signup", checkJwt, async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  const exists = await User.findOne({ email: user.email });
  if (!exists) {
    try {
      await user.save();
      res.status(201).send({ user });
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    //exists.toObject({ virtuals: true });
    const user = await exists.populate("images").execPopulate();
    //user.toObject({ virtuals: true })
    console.log(user);
    res.status(201).send({ user });
  }
});
//######################## POST ##########################
router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## GET ###########################
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

//######################## GET BY ID #####################
router.get("/api/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//######################## UPDATE ########################
router.patch("/api/users/me", checkJwt, async (req, res) => {
  const user = req.user;
  const userUpdate = req.body;

  //Check for valid updates
  const updates = Object.keys(userUpdate);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every(item => {
    return allowedUpdates.includes(item);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach(item => (user[item] = userUpdate[item]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//######################## DELETE ########################
router.delete("/api/users/me", checkJwt, async (req, res) => {
  const user = req.user;
  try {
    await user.remove();
    //sendCancellationEmail(user.email, user.name);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
