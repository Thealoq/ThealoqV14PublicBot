const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "envanter"
        this.description = "envanter gösteriyor"
    }
    async execute(ctx) {
        function Emoji(e) {
            return client.emojis.cache.find((emojis) => emojis.name === e);
        }
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
            .setColor("RANDOM")
        let UserData = await UserModal.find({
            Member: ctx.user.id
        });
        if (!UserData) {
            new UserModal({
                Member: veri,
                Coin: 0,
                Status: false,
                Pets: []
            }).save().catch(e => { console.error("hata var") })
            return ctx.reply("Daha Önce Oynadiğin Göremiyorum ama Kormayin Sizi Kayit Ettim")
        }
          
             const PetShop = `${UserData[0].Pets.map(item => `Petlerin: [${Emoji(item.Value)}]  \`${item.Name}\` (${item.level ? item.level : 0})`).join("\n")}`
              
             ctx.reply({ embeds: [embed.setDescription(`${UserData ? PetShop : "Datan Bulunmuyor"}`)] })
    }
}
module.exports = Commands
