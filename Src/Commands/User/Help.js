const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const Thealoq = Underline.Thealoq
const config = global.config

module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("help komutu"),
    run: async (ctx) => {
        const Content = `${Thealoq.slashCommands.filter(x => x.options.public !== false).map(x => `• \`/${x.data.name}\`  Komutu ${x.data.description} `).join("\n ")}`
        const Embed = new EmbedBuilder()
        ctx.reply({
            embeds:[Embed.setDescription(Content)
                .setFooter({ text : config.footer.toString(), iconURL: ctx.guild.iconURL() })
                .setTitle("Help Komutlari")
                .setTimestamp()
                ]
        })

    }
};
