const mongoose = require("mongoose");

const NewGuildSettings = mongoose.Schema(
  {
    GuildId: String,
    Set: Array,
    type: String
  },
  { minimize: false, collection: "NewGuildSettings" }
);

module.exports = mongoose.model("NewGuildSettings", NewGuildSettings);