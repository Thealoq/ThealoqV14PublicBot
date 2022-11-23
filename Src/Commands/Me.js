const config = global.config;
const client = global.client;
const MemberData = require('../schema/UserLenght');
const ChannelData = require('../schema/Channel');
const MessageChannel = require('../schema/MessageChannel');
const MessageData = require('../schema/MessageData');
const { MessageEmbed } = require("discord.js");
 class Commands {
  constructor() {
    this.name = "me";
    this.description = "üyesinin ses ve chat istatistikleri gösterir";
    this.options = [];
    
  }
  async execute(ctx) {
    let embed = new MessageEmbed()
    .setAuthor({name: ctx.guild.name,iconURL: ctx.guild.iconURL({ dynamic: true }),})
    .setFooter({text: config.footer.toString(),iconURL: ctx.user.avatarURL({ dynamic: true })})
    .setColor("RANDOM");
    let MessageDb = await MessageData.findOne({ GuildId: ctx.guild.id, MemberId: ctx.member.id })
    let MessageChannelDb = await MessageChannel.find({ GuildId: ctx.guild.id, MemberId: ctx.member.id })
    let ChannelDb = await ChannelData.find({ GuildId: ctx.guild.id, MemberId: ctx.member.id }) 
    let MemberDb = await MemberData.findOne({ GuildId: ctx.guild.id, MemberId: ctx.member.id })
    if (MessageDb && MemberDb) {
        const contenttwo = `${MessageChannelDb.map( (t, index) => ` \`${index+1}\` <#${t.Channel}> \`${t.Point}\` `).join("\n")}`
        const content = `${ChannelDb.map((x, index) => `\`${index+1}\` <#${x.Channel}> \`${Cover(x.VoiceTime)}\` `).join("\n")}`
        ctx.reply({ embeds: 
          [embed.setDescription(` ${ctx.member} üyesinin ses ve chat istatistikleri 
          \n Toplam Mesaj Sayısı \`${MessageDb.Point}\` 
          Toplam Ses Sayısı \`${Cover(MemberDb.VoiceTime)}\`
          \n **Ses** 
          ${content} 
          \n **Mesaj** 
          ${contenttwo}`)] })
    } else {
        ctx.reply("Hiç bir veriniz bulunmuyor")
    }
}
}

module.exports = Commands;
 
function Cover(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}