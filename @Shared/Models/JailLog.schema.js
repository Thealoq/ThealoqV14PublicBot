const { default: mongoose } = require("mongoose");

const model = mongoose.model("JailLog", mongoose.Schema(
    {
        GuildID: String,
        UsedID: String,
        ModID: String,
        Type: String,
        CreatedAt: Date,
        ExpiresAt: Date,
        IsActive: Boolean,
    },
    { minimize: false, collection: "JailLog" }
));
module.exports = model

