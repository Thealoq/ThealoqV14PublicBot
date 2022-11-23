const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const SecretDb = require("../schema/Secret")
class Commands {
    constructor() {
        this.name = "secret"
        this.description = "secret"
    }
    async execute(ctx) {
      
    }
}
module.exports = Commands
