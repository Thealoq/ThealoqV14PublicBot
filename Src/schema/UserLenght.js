const mongoose = require("mongoose");

const UserLenght = mongoose.Schema(
  {
    GuildId: String,
    MemberId: String,
    VoiceTime: Number,
  },
  { minimize: false, collection: "UserLenght" }
);

module.exports = mongoose.model("UserLenght", UserLenght);