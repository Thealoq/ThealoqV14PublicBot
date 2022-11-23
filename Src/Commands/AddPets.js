const config = global.config;
constclient = global.client;
const { MessageEmbed } = require("discord.js")
const Pets = require("../schema/Pets");
class Commands {
  constructor() {
    this.name = "pet";
    this.description = "pet ekleme";
    this.options = [
      {
        type: 3,
        description: `ekliceğiniz petin emoji ismi`,
        name: "value",
      },
      {
        type: 3,
        description: `ekliceğiniz petin ismi`,
        name: "name",
      },
      {
        type: 4,
        description: `ekliceğiniz petin fiyati`,
        name: "price",
      },
    ];
    this.on = true
  }
  async execute(ctx) {
    function Emoji(e) {
      return client.emojis.cache.find((emojis) => emojis.name === e);
  }
    let embed = new MessageEmbed()
    .setAuthor({
      name: ctx.guild.name,
      iconURL: ctx.guild.iconURL({ dynamic: true }),
    })
    .setFooter({
      text: config.footer.toString(),
      iconURL: ctx.user.avatarURL({ dynamic: true }),
    });
  

    if(ctx.user.id !== "1000776223795970108") return ctx.reply("Kanka Sadece Geliştirici Kullabilir")
    if(!ctx.options._hoistedOptions[0] && !ctx.options._hoistedOptions[1] && !ctx.options._hoistedOptions[2] ) {
        return ctx.reply("Dostum Hepsini Doldurmalisin")
    } else {
        await Pets.updateOne({ }, { $push: { Pets: { 
            Value: ctx.options._hoistedOptions[0].value, 
            Name: ctx.options._hoistedOptions[1].value, 
            Price: ctx.options._hoistedOptions[2].value, 
            Pet: `${await Emoji(ctx.options._hoistedOptions[0].value)}` } } }, { upsert: true }).catch(e => { console.error("hata var") })
        ctx.reply({ embeds: [embed.setColor("GREEN").setDescription(`<@${ctx.user.id}> Başariyla ${Emoji(ctx.options._hoistedOptions[0].value)} Emojisini \n  ${ctx.options._hoistedOptions[1].value} Adıyla \n ${ctx.options._hoistedOptions[1].value} Fiyatıyla ekledim `)] })
    }
  }
}
module.exports = Commands;
