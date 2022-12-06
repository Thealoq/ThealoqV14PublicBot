const config = global.config;
const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../schema/Settings");
const GSettings = require("../schema/NewGuildSettings");
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

    const GuildSettings = await GSettings.findOne({
      Guild: member.guild.id,
      Set: { $elemMatch: { type: "welcome-role" } },
    });

    const allSettings = await Settings.findOne({
      Guild: member.guild.id,
      Channels: { $elemMatch: { type: "Welcome" } },
    });


    if (!allSettings) return;
    if (!allSettings.Channels[0].Status) return;
    if(!GuildSettings) return
    member.roles.add(GuildSettings.Set[0].role).catch(t => { })
    const channelid = allSettings.Channels[0].Channel
    if (member.guild.channels.cache.get(channelid) ? member.guild.channels.cache.get(channelid) : null)
      member.guild.channels.cache.get(allSettings.Channels[0].Channel).send({
        embeds: [embed.setDescription(`${Emoji("Hello")} Sunucumuza Hoşgeldin geldin ${member} Seni Gördüğümüze Sevindik.
        • Hesabın \`${moment(member.user.createdTimestamp).format("LLL")}\` tarihinde \`${moment(member.user.createdTimestamp).fromNow()}\` oluşturulmuş
        • Seninle Birlikte ${member.guild.members.cache.size} kişi Oldu `,)]
      });
  
  }
}
module.exports = Events;

