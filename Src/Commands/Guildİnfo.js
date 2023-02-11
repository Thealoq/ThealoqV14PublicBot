const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("show guild info"),
    run: async (ctx) => {
        let embed = new EmbedBuilder()
        .setColor(`Aqua`)
      ctx.reply({
        embeds: [embed.setDescription(`
      \`❯\` A Total of \`${ctx.guild.members.cache.filter(s => s.voice.channel).size}\` Person on Your Server is Active on the Voice Channel
      \`❯\` There are a total of \`${ctx.guild.memberCount}\` members on the server right now.
       `)]
      })
        }
}