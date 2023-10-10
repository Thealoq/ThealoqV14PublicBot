const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Sunucu Bilgilerini Gösterir"),
    run: async (ctx) => {
        let embed = new EmbedBuilder()
        .setColor(`Aqua`)
      ctx.reply({
        embeds: [embed.setDescription(`
      \`❯\` Seste Akti Olan Üye Sayısı \`${ctx.guild.members.cache.filter(m => m.voice.channel).size}\`
      \`❯\` Toplam Üye Sayisi \`${ctx.guild.memberCount}\`
      \`❯\` Sunucumuz şuan da \`${ctx.guild.premiumSubscriptionCount}\` Kişi boost Basmiş
       `)]
      })
        }
}