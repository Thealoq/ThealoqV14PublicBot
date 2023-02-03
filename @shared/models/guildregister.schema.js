const { default: mongoose } = require("mongoose");
const model = mongoose.model("Test", mongoose.Schema(
    {
       GuildID: String,
       Member: String,
       Register: Array,
    },
    { minimize: false, collection: "Test" }
));

module.exports = model