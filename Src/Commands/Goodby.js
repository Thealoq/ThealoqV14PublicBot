const config = global.config;
const client = global.client;
const Settings = require("../schema/Settings");
class Commands {
  constructor() {
    this.name = "goodby";
    this.description = "goodby";
    this.options = [
      {
        type: 7,
        description: `hos geldin mesaji için bi yer belirleyin`,
        name: "channel",
      },
      {
        type: 5,
        description: `kapalı mı açık mı`,
        name: "boolen",
      },
    ];
    
  }
  async execute(ctx) {
    if (ctx.user.id !== "1000776223795970108" && !ctx.member.permissions.has("ADMINISTRATOR")) return ctx.reply("Yetkiniz Yeterli Değil")
    if (!ctx.options._hoistedOptions[0])
      return ctx.reply("Kanal Belirle Lütfen");
    const Channel = ctx.options._hoistedOptions[0].value;
    const Boolean = ctx.options._hoistedOptions[1].value;
    const allSettings = await Settings.findOne({
      Guild: ctx.guild.id,
      Channels: { $elemMatch: { type: "Goodby" } },
    });
    if (!allSettings) {
      new Settings({
        Guild: ctx.guild.id,
        Channels: { type: "Goodby", Status: Boolean, Channel: Channel },
      }).save();
      return ctx.reply(`başariyla görüşüz kanali <#${Channel}> ${Boolean ? "Açık" : "Kapalı"} ayarlandi`);
    }
    if (allSettings) {
     await Settings.findOneAndUpdate(
        {
          Guild: ctx.guild.id,
          Channels: { $elemMatch: { type: "Goodby" } },
        },
        {
          $set: {
            Channels: { type: "Goodby", Status: Boolean, Channel: Channel },
          },
        }
      );
    }
    return ctx.reply(`başariyla görüşüz kanali <#${Channel}> ${Boolean ? "Açık" : "Kapalı"} ayarlandi`);
  }
}
module.exports = Commands;
