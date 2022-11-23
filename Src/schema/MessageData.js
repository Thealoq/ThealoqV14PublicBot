const mongo = require('mongoose')
let MessageData = new mongo.Schema({
    GuildId: String,
    MemberId: String,
    Point: Number,
},
  { minimize: false, collection: "MessageData" }
)
module.exports = new mongo.model('MessageData', MessageData)