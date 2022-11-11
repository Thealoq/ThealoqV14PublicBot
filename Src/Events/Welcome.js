const config = global.config;
const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../schema/Settings");
const moment = require("moment");
moment.locale("tr");
class Events {
  constructor() {
    this.name = "guildMemberAdd";
  }
  async execute(member) {
    let embed = new MessageEmbed()
    .setAuthor({
      name: member.guild.name,
      iconURL: member.guild.iconURL({ dynamic: true }),
    })
    .setFooter({
      text: config.footer.toString(),
      iconURL: member.user.avatarURL({ dynamic: true }),
    })
    .setColor("RANDOM");
    function Emoji(e) {
        return client.emojis.cache.find((emojis) => emojis.name === e);
    }
    const allSettings = await Settings.findOne({
      Guild: member.guild.id,
      Channels: { $elemMatch: { type: "Welcome" } },
    });
    if (!allSettings) return;
    if (!allSettings.Channels[0].Status) return;
    if (member.guild.channels.cache.get(allSettings.Channels[0].Channel).type === "GUILD_TEXT")
      member.guild.channels.cache.get(allSettings.Channels[0].Channel).send({
        embeds: [embed.setDescription(`${Emoji("Hello")} Sunucumuza Hoşgeldin geldin ${member} Seni Gördüğümüze Sevindik.
        • Hesabın \`${moment(member.user.createdTimestamp).format("LLL")}\` tarihinde \`${moment(member.user.createdTimestamp).fromNow()}\` oluşturulmuş
        • Seninle Birlikte ${member.guild.members.cache.size} kişi Oldu `,)]
      });
  }
}
module.exports = Events;
