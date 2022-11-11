const mongoose = require("mongoose");

const GuildSettings = mongoose.Schema(
  {
    Guild: String,
    Channels: Array,
  },
  { minimize: false, collection: "GuildSettings" }
);

module.exports = mongoose.model("GuildSettings", GuildSettings);