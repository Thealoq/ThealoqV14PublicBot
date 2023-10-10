const { default: mongoose } = require("mongoose");

const model = mongoose.model("SecretVoice", mongoose.Schema(
    {
        GuildID: String,
        Member: String,
        Channel: String
    },
    { minimize: false, collection: "SecretVoice" }
));
module.exports = model  

