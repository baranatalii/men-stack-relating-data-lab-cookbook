const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// INDEX - GET /users/:userId/fragrances
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    res.render("fragrances/index.ejs", {
      // Passing both the user and the fragrances array
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
  // We find the user here too so the 'new' page knows the userId for the form action
  const currentUser = await User.findById(req.params.userId);
  res.render("fragrances/new.ejs", { user: currentUser });
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

module.exports = router;
