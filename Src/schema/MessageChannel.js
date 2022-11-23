const mongoose = require("mongoose");

const MessageChannel = mongoose.Schema(
  {
    GuildId: String,
    MemberId: String,
    Channel: String,
    Point: Number,
  },
 { minimize: false, collection: "MessageChannel"} 
);
module.exports = mongoose.model("MessageChannel", MessageChannel);