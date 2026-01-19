const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// INDEX - GET /USERS [Community Page]
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("users/index.ejs", { allUsers });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// SHOW - GET /View Other Vaults:
router.get("/:userId", async (req, res) => {
  try {
    const userToShow = await User.findById(req.params.userId);
    res.render("users/show.ejs", { userToShow });
  } catch (error) {
    console.log(error);
    res.redirect("/users");
  }
});

module.exports = router;
