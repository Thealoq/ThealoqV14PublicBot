const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    Member: String,
    Coin: Number,
    Status: Boolean,
    Pets: Array
  },
  { minimize: false, collection: "User" }
);

module.exports = mongoose.model("User", User);