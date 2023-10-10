const config = global.config
const client = Underline.Thealoq
const { EmbedBuilder } = require("discord.js");
const { Events: Event } = require("discord.js")
class Events {
    constructor() {
        this.name = Event.InteractionCreate
    }
    async execute(interaction) {
        const command = interaction.commandName;
        const embed = new EmbedBuilder();
        if (client.slashCommands.has(command)) {
            const commandOptions = client.slashCommands.get(command).options;
            if (commandOptions?.developer && !config.botOwner.includes(interaction.member.id)) {
                const content = "[🧑‍💻] Sadece Geliştirici Kullanabilir";
                return interaction.reply({
                    embeds: [
                        embed.setDescription(content)
                            .setImage("https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif")
                        .setFooter({ text:`/${command} istendi` })]
                        .setColor("#043342")
                });
            } else if (commandOptions?.inactive) {
                const content = "[⚡] Kullanima Kapatilmiştir";
                return interaction.reply({
                    embeds: [
                        embed.setDescription(content)
                        .setFooter({ text:`/${command} istendi` })
                        .setImage("https://media.giphy.com/media/ThrM4jEi2lBxd7X2yz/giphy.gif")
                            .setColor("Red")
                    ]
                });
            } else {
                client.slashCommands.get(command).run(interaction);
            }
        }
    }

}
module.exports = Events