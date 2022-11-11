const config = global.config
const client = global.client
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "daily"
        this.description = "Günlük Coin kazanirsiniz"
    }
    async execute(ctx) {
        function Emoji(e) {
            return client.emojis.cache.find((emojis) => emojis.name === e);
        }
        const Daily = Math.floor(Math.random() * 300)
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
        let UserData = await UserModal.findOne({
            Member: ctx.user.id,
        });
        if (!UserData) {
            new UserModal({
                Member: ctx.user.id,
                Coin: Daily,
                Status: true,
                Pets: []
            }).save()
            ctx.reply({ embeds: [embed.setDescription(`Seni Burda İlk Defa Görüyorum Aramıza Hoş Geldin <@${ctx.user.id}>  🎂 \n Ayrica Sana Başlarken ${Daily} Miktar Para Verdim`)] })
        }
        if (UserData && UserData.Status == true) return ctx.reply({ embeds: [embed.setDescription(`[${await Emoji("angry")}] A ödülünü Almişsin neden Tekrar Almaya Çalişiyorsun`).setColor("ff2400")] })
        if (UserData) {
            const Puan = UserData.Coin + Daily
            await UserModal.updateOne({  Member: ctx.member.id }, { $set: { Coin: Puan } }, { upsert: true }).catch(e => { console.error("hata var") })
            return ctx.reply({ embeds: [embed.setDescription(`<@${ctx.user.id}> Aldı Userin Artik ${Puan} ${await Emoji("Coin")} Kadar Coine Sahip`).setColor("33f500")] })
        }
        
    }
}
module.exports = Commands
