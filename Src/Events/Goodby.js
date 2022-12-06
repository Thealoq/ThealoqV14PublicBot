const config = global.config;
const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../schema/Settings");
class Events {
  constructor() {
    this.name = "guildMemberRemove";
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
        Channels: { $elemMatch: { type: "Goodby" } },
      });
    if (!allSettings) return;
    const channelid = allSettings.Channels[0].Channel
    if (member.guild.channels.cache.get(channelid) ? member.guild.channels.cache.get(channelid) : null)
    member.guild.channels.cache.get(allSettings.Channels[0].Channel).send({
      embeds: [
        embed.setDescription(
          `Görüşüz ${member} ${Emoji("sad")} Umarim Tekrar Gelirsin.`
        ),
      ],
    });
  }
}
module.exports = Events;
