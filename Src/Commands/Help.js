const config = global.config;
const client = global.client;
const commands = global.commands
const { MessageEmbed } = require("discord.js");
 class Commands {
  constructor() {
    this.name = "help";
    this.description = "tüm komutlari gösterir";
    this.options = [];
    
  }
  async execute(ctx) {
    let embed = new MessageEmbed()
    .setAuthor({name: `${ctx.client.user.username} Botun Komutlari`,iconURL: ctx.guild.iconURL({ dynamic: true }),})
    .setFooter({text: config.footer.toString(),iconURL: ctx.client.user.avatarURL({ dynamic: true })})
    .setColor("RANDOM");
    const content = `${commands.map((x, index) => ` ✅ \`/${x.name}\` Açıklama \`${x.description}\` `).join("\n")}`
    ctx.reply({ embeds: [embed.setDescription(`${content}`)]})
}
}
module.exports = Commands;
 

