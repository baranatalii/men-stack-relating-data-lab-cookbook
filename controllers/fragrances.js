const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// INDEX - GET /users/:userId/fragrances
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    res.render("fragrances/index.ejs", {
      fragrances: currentUser.fragrances || [],
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("fragrances/new.ejs");
});

// CREATE - POST /users/:userId/fragrances
router.post("/", async (req, res) => {
  try {
    // 1. Find the user by the ID in the URL
    const currentUser = await User.findById(req.params.userId);

    // 2. Push the form data (req.body) into the user's fragrances array
    currentUser.fragrances.push(req.body);

    // 3. Save the changes to the user document in MongoDB
    await currentUser.save();

    // 4. Redirect the user back to their vault to see the new scent
    res.redirect(`/users/${currentUser._id}/fragrances`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
