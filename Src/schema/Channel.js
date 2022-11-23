const mongoose = require("mongoose");

const ChannelStats = mongoose.Schema(
  {
    GuildId: String,
    MemberId: String,
    Channel: String,
    VoiceTime: Number,
    parentID: String,
    parentData: { type: Number, default: 0 },
  },
  { minimize: false, collection: "ChannelStats" }
);

module.exports = mongoose.model("ChannelStats", ChannelStats);