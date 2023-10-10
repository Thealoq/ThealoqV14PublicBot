
const client = Underline.Thealoq
const { Events: Event } = require("discord.js")
const Discord = require("discord.js")
class Events {
    constructor() {
        this.name = Event.GuildMemberAdd
    }
    async execute(member) {
        
    }
}
module.exports = Events
