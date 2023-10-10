const { default: mongoose } = require("mongoose");

const model = mongoose.model("ButtonRoleGuild", mongoose.Schema(
    {
        GuildID: String,
        ButtonRole: Array
    },
    { minimize: false, collection: "ButtonRoleGuild" }
));
module.exports = model  

