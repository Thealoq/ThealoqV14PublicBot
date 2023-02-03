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
      \`❯\` Sunucunda Toplam ${ctx.guild.members.cache.filter(s => s.voice.channel).size} Kişi Ses Kanalında Aktif 
      \`❯\` Sunucu da şuan da toplam ${ctx.guild.memberCount} üye var 
       `)]
      })
        }
}