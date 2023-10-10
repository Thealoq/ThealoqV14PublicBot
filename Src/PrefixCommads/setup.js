const { PermissionsBitField } = require("discord.js");
const config = global.config
const client = Underline.Thealoq
module.exports = {
    name: "setup",
    aliases: ["setup"],
    description: "setup",
    run: async(message, args) => {
      message.reply({ content: `${message.member}` })
    }
}