const mongoose = require("mongoose");

// 1. Define the schema for the individual fragrance
const fragranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

// 2. Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 3. Add the array of fragrances as an embedded subdocument
  fragrances: [fragranceSchema], 
});

module.exports = mongoose.model("User", userSchema);