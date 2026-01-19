const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// Index Route - Renders the user's fragrance vault
router.get("/", async (req, res) => {
  try {
    // Look up to the user by the ID in the URL
    const currentUser = await User.findById(req.params.userId);

    // Render the index.ejs file inside the views/fragrances folder
    // We pass the fragrances to the view
    res.render("fragrances/index.ejs", {
      fragrances: currentUser.fragrances,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
