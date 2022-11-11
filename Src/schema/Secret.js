const mongoose = require("mongoose");

const Secret = mongoose.Schema(
  {
    Member: String,
    ChannelID: String,
  },
  { minimize: false, collection: "Secret" }
);

module.exports = mongoose.model("Secret", Secret);