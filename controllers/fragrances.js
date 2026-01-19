const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// INDEX - GET /users/:userId/fragrances
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    res.render("fragrances/index.ejs", {
      user: currentUser,
      fragrances: currentUser.fragrances || [],
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// NEW - GET /users/:userId/fragrances/new
router.get("/new", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    res.render("fragrances/new.ejs", { user: currentUser });
  } catch (error) {
    res.redirect("/");
  }
});

// CREATE - POST /users/:userId/fragrances
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    currentUser.fragrances.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/fragrances`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// DELETE - DELETE /users/:userId/fragrances/:fragranceId
router.delete("/:fragranceId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    // Look into the fragrances array and delete the one with the matching ID
    currentUser.fragrances.id(req.params.fragranceId).deleteOne();

    // Save the parent document (the user) to finalize the removal
    await currentUser.save();

    // Send the user back to the index page
    res.redirect(`/users/${currentUser._id}/fragrances`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
