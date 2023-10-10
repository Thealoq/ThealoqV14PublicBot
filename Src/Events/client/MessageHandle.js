const config = global.config
const client = Underline.Thealoq
const { Events: Event } = require("discord.js")
class Events {
    constructor() {
        this.name = Event.MessageCreate
    }
    execute(message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.content.startsWith(config.prefix)) {
            let args = message.content.substring(config.prefix.length).trim().split(" ")
            let command = args[0]
            args = args.splice(1);
            if(client.commands.has(command)) {
                client.commands.get(command).run(message, args);
            } else if(client.aliases.has(command)) {
                client.aliases.get(command).run(message, args);
            } else return
        };
    }
}
module.exports = Events