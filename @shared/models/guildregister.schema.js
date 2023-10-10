const { default: mongoose } = require("mongoose");

const model = mongoose.model("GuildSettings", mongoose.Schema(
    {
        GuildID: String,
        Status: Boolean,
        Role: String,
        RulesCh: String,
        WelcomCh: String,
        JailRole: String
    },
    { minimize: false, collection: "GuildSettings" }
));
module.exports = model  