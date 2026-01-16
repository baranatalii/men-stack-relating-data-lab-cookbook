const { Router } = require("express");
const authRoutes = require("./auth.js");
const isSignedIn = require("../middleware/is-signed-in.js");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

// Example of protecting a route with custom middleware (isSignedIn)
router.get("/vip", isSignedIn, (req, res) => {
  res.send("You made it to the vip lounge.");
});

router.use("/auth", authRoutes);

module.exports = router;
