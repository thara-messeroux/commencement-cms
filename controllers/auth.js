const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// show sign-up page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

// create new user account
router.post("/sign-up", async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });

  // stop duplicate usernames
  if (foundUser) {
    return res.send("Username already exists.");
  }

  // hash password before saving
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  await User.create({
    username: req.body.username,
    password: hashedPassword,
  });

  res.redirect("/auth/sign-in");
});

// show sign-in page
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in");
});

// sign user in
router.post("/sign-in", async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });

  // stop if user does not exist
  if (!foundUser) {
    return res.send("Invalid username or password.");
  }

  const passwordsMatch = bcrypt.compareSync(
    req.body.password,
    foundUser.password,
  );

  // stop if password is wrong
  if (!passwordsMatch) {
    return res.send("Invalid username or password.");
  }

  // save logged-in user in session
  req.session.user = {
    username: foundUser.username,
    _id: foundUser._id,
  };

  res.redirect("/");
});

// sign user out
router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
