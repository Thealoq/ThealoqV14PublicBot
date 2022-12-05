const config = global.config;
const client = global.client;
const { MessageEmbed } = require("discord.js")
class Commands {
  constructor() {
    this.name = "say";
    this.description = "toplam sayi gösterir";
    this.options = [];
  }
  async execute(ctx) {
    let embed = new MessageEmbed()
    .setColor(`RANDOM`)
  ctx.reply({
    embeds: [embed.setDescription(`
  \`❯\` Sunucunda Toplam ${ctx.guild.members.cache.filter(s => s.voice.channel).size} Kişi Ses Kanalında Aktif 
  \`❯\` Sunucu da şuan da toplam ${ctx.guild.memberCount} üye var 
  \`❯\` Toplam ${ctx.guild.members.cache.filter(t => t.user.username.includes(config.tag)).size} kişi tagımızı alarak bize destek oluyor 
   `)]
  })
    }
}

module.exports = Commands;