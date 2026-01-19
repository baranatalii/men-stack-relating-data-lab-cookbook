const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// This is the Index route - it will show the vault later
router.get("/", (req, res) => {
  res.send("Welcome to the Fragrance Vault!");
});

module.exports = router;
