const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "bakım"
        this.description = "bakım"
    }
    async execute(ctx) {
        ctx.reply("bakımda")
    }
}
module.exports = Commands
