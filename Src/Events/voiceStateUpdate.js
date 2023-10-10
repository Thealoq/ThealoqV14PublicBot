
const client = Underline.Thealoq
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Events:Event } = require("discord.js")
class Events {
  constructor() {
    this.name = Event.VoiceStateUpdate
  }
  async execute(oldState, newState) {
    /*
    let seslog = client.channels.cache.get("1126764875046211635");
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

    if ((!oldState?.channelId) && (newState?.channelId)) {
      const channel = newState.channel;
      const embed = new EmbedBuilder()
      .setDescription("Kanala Katıldı")
      .setAuthor( { name: oldState.member.user.username, iconURL: oldState.member.user.avatarURL({ dynamic: true }) })
      .setColor("White")
      .addFields(
        { name: 'Kanal', value: `${channel} (${channel.id})` },
        { name: 'Katıldığı Zaman', value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
        { name: 'ID', value: `\`\`\`\nKullanıcı = ${oldState.member.user.id}\nKanal = ${channel.id}\n\`\`\``},
      )
      .setFooter({ text: `${client.user.username}#${client.user.discriminator}`, iconURL: client.user.avatarURL() })
      .setTimestamp();
      seslog.send({ embeds: [embed] });
    } else if ((oldState && oldState.channelId) && (newState && !newState.channelId)) {
      const channel = oldState.channel;
      const embed = new EmbedBuilder()
      .setDescription("Kanala Ayrildi")
      .setAuthor( { name: oldState.member.user.username, iconURL: oldState.member.user.avatarURL({ dynamic: true }) })
      .setColor("White")
      .addFields(
        { name: 'Kanal', value: `${channel} (${channel.id})` },
        { name: 'Katıldığı Zaman', value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
        { name: 'ID', value: `\`\`\`\nKullanıcı = ${oldState.member.user.id}\nKanal = ${channel.id}\n\`\`\``},
      )
        
      seslog.send({ embeds: [embed] });
    } else {
      const channel = newState.channel;
      const embed = new EmbedBuilder()
      .setDescription("Kanal Değiştirdi")
      .setAuthor( { name: oldState.member.user.username, iconURL: oldState.member.user.avatarURL({ dynamic: true }) })
      .setColor("White")
      .addFields(
        { name: 'Kanal', value: `${channel} (${channel.id})` },
        { name: 'Katıldığı Zaman', value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
        { name: 'ID', value: `\`\`\`\nKullanıcı = ${oldState.member.user.id}\nKanal = ${channel.id}\n\`\`\``},
      )
      seslog.send({ embeds: [embed] });
    }
      */
  }
}
module.exports = Events
