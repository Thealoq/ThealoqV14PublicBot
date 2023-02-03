const { default: mongoose } = require("mongoose");

const model = mongoose.model("GuildSettings", mongoose.Schema(
    {
        GuildID: String,
        Status: String,
        Welcome: String,
        Unregister: String,
        WelcomeName: String,
        MemberRole: String,
        GenelCh: String,
        WelRole: String,
        OwnerID: String,
        Tag: String,
        TagCheck: {
            default: false,
            type: Boolean
        }
    },
    { minimize: false, collection: "GuildSettings" }
));
module.exports = model