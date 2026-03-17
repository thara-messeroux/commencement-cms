const express = require("express");
const Awardee = require("../models/Awardee");
const isSignedIn = require("../middleware/is-signed-in");

const router = express.Router();

// show all awardees created by the logged-in user
router.get("/", isSignedIn, async (req, res) => {
  // get only the logged-in user's awardees
  const awardees = await Awardee.find({ createdBy: req.session.user._id });

  // show the awardees dashboard page
  res.render("awardees/index", { awardees });
});

// show form to create a new awardee
router.get("/new", isSignedIn, (req, res) => {
  res.render("awardees/new");
});

// create a new awardee
router.post("/", isSignedIn, async (req, res) => {
  req.body.createdBy = req.session.user._id;
  await Awardee.create(req.body);
  res.redirect("/awardees");
});

// show one awardee
router.get("/:awardeeId", isSignedIn, async (req, res) => {
  const awardee = await Awardee.findOne({
    _id: req.params.awardeeId,
    createdBy: req.session.user._id,
  });

  if (!awardee) {
    return res.send("Awardee not found.");
  }

  res.render("awardees/show", { awardee });
});

// show edit form
router.get("/:awardeeId/edit", isSignedIn, async (req, res) => {
  const awardee = await Awardee.findOne({
    _id: req.params.awardeeId,
    createdBy: req.session.user._id,
  });

  if (!awardee) {
    return res.send("Awardee not found.");
  }

  res.render("awardees/edit", { awardee });
});

// update awardee
router.put("/:awardeeId", isSignedIn, async (req, res) => {
  const awardee = await Awardee.findOneAndUpdate(
    {
      _id: req.params.awardeeId,
      createdBy: req.session.user._id,
    },
    req.body,
    { new: true },
  );

  if (!awardee) {
    return res.send("Awardee not found.");
  }

  res.redirect(`/awardees/${awardee._id}`);
});

// delete awardee
router.delete("/:awardeeId", isSignedIn, async (req, res) => {
  const awardee = await Awardee.findOneAndDelete({
    _id: req.params.awardeeId,
    createdBy: req.session.user._id,
  });

  if (!awardee) {
    return res.send("Awardee not found.");
  }

  res.redirect("/awardees");
});

module.exports = router;
