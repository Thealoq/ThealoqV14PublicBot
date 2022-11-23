const config = global.config;
const client = global.client;
const MemberData = require("../schema/NewGuildSettings");
const { MessageEmbed } = require("discord.js");
class Commands {
  constructor() {
    this.name = "welcome-rol";
    this.description = "yeni gelen üyele rol verilir";
    this.options = [
      {
        type: 8,
        description: `seviye rolü`,
        name: "role",
      },
      {
        type: 5,
        description: `açık veya kapalı ayarlama`,
        name: "durum",
      },
    ];
  }
  async execute(ctx) {
    if (!ctx.member.permissions.has("ADMINISTRATOR"))return ctx.reply("Yetkiniz Yeterli Değil");
    const Role = ctx.options._hoistedOptions.find((t) => t.name == "role");
    const Level = ctx.options._hoistedOptions.find((t) => t.name == "durum");
    if (!Role && !Level) return ctx.reply("[❌] Level veya Role Belirlemedin");
    const Data = await MemberData.findOne({ GuildId: ctx.guild.id, Set: { $elemMatch: { type: "message" } }})
    if(Data) {
      await MemberData.findOneAndUpdate(
        { GuildId: ctx.guild.id, Set: { $elemMatch: { type: "welcome-role" }} },
        { $set: { Set: { role: Role.value, level: Level.value, type: "welcome-role" } } }
      )
        .then((t) =>
          ctx.reply(
            `Başariyla <@&${Role.value}> Rolü \`${Level.value ? "Açık": "Kapalı"}\` Leveline Ayarlandi `
          )
        )
        .catch((e) => ctx.reply("veriyi kayit ederken sorunla karşilaştim"));
    }  else {
      new MemberData({
        GuildId: ctx.guild.id,
        Set: { role: Role.value, level: Level.value, type: "welcome-role"},
       
      }).save();
      ctx.reply(
        `Başariyla <@&${Role.value}> Rolü \`${Level.value ? "Açık": "Kapalı"}\` Ayarlandi `
      )
    }
   
  }
}

module.exports = Commands;
