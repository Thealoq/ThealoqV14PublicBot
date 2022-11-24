const config = global.config;
const client = global.client;
const MemberData = require("../schema/NewGuildSettings");
const { MessageEmbed } = require("discord.js");
class Commands {
  constructor() {
    this.name = "katagori";
    this.description = "özel odada sistemi için kanal ayarlama komutu";
    this.options = [
      {
        type: 7,
        description: `seviye rolü`,
        name: "channel",
      },
      
    ];
  }
  async execute(ctx) {
    if (!ctx.member.permissions.has("ADMINISTRATOR"))return ctx.reply("Yetkiniz Yeterli Değil");
    const Channel = ctx.options._hoistedOptions.find((t) => t.name == "channel");
    if (!Channel) return ctx.reply("[❌] Kanal Belirlemedin");
    const Data = await MemberData.findOne({ GuildId: ctx.guild.id, Set: { $elemMatch: { type: "userVoice" } }})
    if(Data) {
      await MemberData.findOneAndUpdate(
        { GuildId: ctx.guild.id, Set: { $elemMatch: { type: "userVoice" }} },
        { $set: { Set: { channel: Channel.value,  type: "userVoice" } } }
      )
        .then((t) =>
          ctx.reply(
            `Başariyla <#${Channel}> Katagori Ayarlandi `
          )
        )
        .catch((e) => ctx.reply("veriyi kayit ederken sorunla karşilaştim"));
    }  else {
      new MemberData({
        GuildId: ctx.guild.id,
        Set: { channel: Channel.value, type: "userVoice"},
       
      }).save();
      ctx.reply(
        `Başariyla <#${Channel}> Katagori Ayarlandi `
      )
    }
   
  }
}

module.exports = Commands;
