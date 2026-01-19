const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// INDEX - GET
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

// NEW - GET
router.get("/new", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    res.render("fragrances/new.ejs", { user: currentUser });
  } catch (error) {
    res.redirect("/");
  }
});

// CREATE - POST
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

// DELETE - DELETE
router.delete("/:fragranceId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    // Look Into The Fragrances Array & Delete The One With The Matching ID
    currentUser.fragrances.id(req.params.fragranceId).deleteOne();

    // Save the Document To Finalize The Removal
    await currentUser.save();

    // Send The User Back To The Index Page
    res.redirect(`/users/${currentUser._id}/fragrances`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// EDIT - GET
router.get("/:fragranceId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const fragrance = currentUser.fragrances.id(req.params.fragranceId);

    res.render("fragrances/edit.ejs", {
      fragrance: fragrance,
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// UPDATE - PUT
router.put("/:fragranceId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    // Find the specific fragrance by ID
    const fragrance = currentUser.fragrances.id(req.params.fragranceId);

    // Update The Fragrance With New Data
    fragrance.set(req.body);

    // Save The User Document
    await currentUser.save();

    // Redirect Back
    res.redirect(`/users/${currentUser._id}/fragrances`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
