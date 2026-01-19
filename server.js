const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const passUserToView = require("./middleware/pass-user-to-view.js");
const isSignedIn = require("./middleware/is-signed-in.js"); // ADDED THIS
const path = require("path");
const db = require("./db/connection.js");
const routes = require("./routes/index.js");
const fragrancesController = require("./controllers/fragrances.js"); // ADDED THIS
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo").default;
dotenv.config();

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  }),
);
app.use(passUserToView);

// Routes
app.use("/", routes);

app.use("/users/:userId/fragrances", isSignedIn, fragrancesController);

// Initialize Server
db.on("connected", () => {
  console.clear();
  console.log("You are connected to MongoDB!");

  app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}!`);
  });
});
