const config = global.config
class Events {
    constructor() {
        this.name = "interactionCreate"
    }
    execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const a = commands.find(c => c.name === interaction.commandName)
        if (!a) return;
        a.execute(interaction);
    }
}
module.exports = Events


