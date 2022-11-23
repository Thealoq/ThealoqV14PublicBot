const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "coin"
        this.description = "User Coin"
        this.options =
            [{
                type: 6,
                description: `seçtiğiniz kişiyinin ne kadar Coin olduğunu söyler`,
                name: "user",
            }]
            
    }
    async execute(ctx) {
        function Emoji(e) {
            return client.emojis.cache.find((emojis) => emojis.name === e);
        }
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
            .setColor("RANDOM")
       const veri = ctx.options._hoistedOptions[0] ? ctx.options._hoistedOptions[0].value : ctx.user.id
        let UserData = await UserModal.findOne({
            Member: veri
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
        if (UserData) {
           return ctx.reply({ embeds: [embed.setDescription(`<@${veri}> Aldı Userin ${UserData.Coin} ${Emoji("Coin")} Kadar Coine Sahip`)] })
        }
    }
}
module.exports = Commands
