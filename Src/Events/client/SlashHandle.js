const config = global.config
const client = Underline.Ghost
class Events {
    constructor() {
        this.name = "interactionCreate"
    }
    async execute(interaction) {
        const command = interaction.commandName
        if(client.slashCommands.has(command)) {
         client.slashCommands.get(command).run(interaction);
        }
    }
}
module.exports = Events