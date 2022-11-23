const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const MemberData = require('../schema/UserLenght');
const MessageData = require('../schema/MessageData');
class Commands {
    constructor() {
        this.name = "top"
        this.description = "top"
        this.options =
            []
    }
    async execute(ctx) {
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
            .setColor("RANDOM")
            let MemberDatas = await MessageData.find({ GuildId: ctx.guild.id }).sort({ Point: -1 }).exec();
            let VoiceMemberData = await MemberData.find({ GuildId: ctx.guild.id })
            console.log(VoiceMemberData);
            if(MemberDatas.length === 0) return ctx.reply({ embeds: [embed.setDescription(`Herhangi bir kayıt verisi bulunamadı!`)]})
            let ContentMessage = MemberDatas.map((x, i) => `\`${i+1}.\`<@${x.MemberId}> Kullancı \`${x.Point}\` Mesaj Geçmişi Sahip `).join(" \n").toString()
            let ContentVoice = VoiceMemberData.map((x, i) => `\`${i+1}.\`<@${x.MemberId}> Kullancı \`${Cover(x.VoiceTime)}\` Ses Geçmişi Sahip `).join(" \n").toString()
            ctx.reply({embeds : [embed.setDescription(`
            **Top Ses**
            ${ContentVoice ? ContentVoice : "Veri Bulamadim"}
            **Top Mesaj**
            ${ContentMessage ? ContentMessage : "Veri Bulamadim"}
            `)]})
    }
}
module.exports = Commands
function Cover(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}