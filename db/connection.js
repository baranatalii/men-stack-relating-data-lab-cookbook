const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("returnOriginal", false); // PUT requests - to send new document

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("disconnected", () => {
  console.log("Disconnedted from MongoDB!");
});

module.exports = mongoose.connection;
