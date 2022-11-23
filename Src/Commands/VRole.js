const config = global.config;
const client = global.client;
const MemberData = require("../schema/NewGuildSettings");
const { MessageEmbed } = require("discord.js");
class Commands {
  constructor() {
    this.name = "ses-rol";
    this.description = "ses seviyesi ve rolü ayarlama";
    this.options = [
      {
        type: 8,
        description: `seviye rolü`,
        name: "role",
      },
      {
        type: 4,
        description: `seviye rolü`,
        name: "level",
      },
    ];
  }
  async execute(ctx) {
    if (!ctx.member.permissions.has("ADMINISTRATOR"))return ctx.reply("Yetkiniz Yeterli Değil");
    const Role = ctx.options._hoistedOptions.find((t) => t.name == "role");
    const Level = ctx.options._hoistedOptions.find((t) => t.name == "level");
    if (!Role && !Level) return ctx.reply("[❌] Level veya Role Belirlemedin");
    const Data = await MemberData.findOne({ GuildId: ctx.guild.id, Set: { $elemMatch: { type: "voice" } }})
    if(Data) {
      await MemberData.findOneAndUpdate(
        { GuildId: ctx.guild.id, Set: { $elemMatch: { type: "voice" }}},
        { $set: { Set: { role: Role.value, level: Level.value, type: "voice" } } }
      )
        .then((t) =>
          ctx.reply(
            `Başariyla <@&${Role.value}> Rolü \`${Level.value}\` Leveline Ayarlandi `
          )
        )
        .catch((e) => ctx.reply("veriyi kayit ederken sorunla karşilaştim"));
    }  else {
      new MemberData({
        GuildId: ctx.guild.id,
        Set: { role: Role.value, level: Level.value,type: "voice" },
      }).save();
      ctx.reply(
        `Başariyla <@&${Role.value}> Rolü \`${Level.value}\` Leveline Ayarlandi `
      )
    }
   
  }
}

module.exports = Commands;
