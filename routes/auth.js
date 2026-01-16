const { Router } = require("express");
const controllers = require("../controllers/auth.js");

const router = Router();

// Put all auth routes here
router.get("/register", controllers.register); // Render my register Form
router.post("/register", controllers.registerUser); // Process my POST request to create a user
router.get("/login", controllers.login); // Render my login Form
router.post("/login", controllers.loginUser); // Process my POST request to log user in
router.get("/sign-out", controllers.signOut); // Logs a user out and destroys the current session

module.exports = router;
