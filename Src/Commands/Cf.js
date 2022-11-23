const config = global.config
const client = global.client
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "cf"
        this.description = "cf komutudur"
        this.options =
            [{
                type: 4,
                description: `yatiricağiniz bahis miktarı`,
                name: "bahis",
            }]
            
    }
    async execute(ctx) {
        function Emoji(e) {
            return client.emojis.cache.find((emojis) => emojis.name === e);
        }
        const Bahis = ctx.options._hoistedOptions[0] ? ctx.options._hoistedOptions[0].value : 1
        const User = await UserModal.findOne({ Member: ctx.user.id })
        if(isNaN(Bahis)) return ctx.reply({ embeds: [embed.setDescription(`Hadi Ama Sadece Sayi`)] })

        const Daily = Math.floor(Math.random() * 300)
        const cf = Math.floor(Math.random() * 30)
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
        if (!User) {
            new UserModal({
                Member: ctx.user.id,
                Coin: Daily,
                Status: true,
                Pets: []
            }).save()
            return ctx.reply({ embeds: [embed.setDescription(`Seni Burda İlk Defa Görüyorum Aramıza Hoş Geldin <@${ctx.user.id}>  🎂 \n Ayrica Sana Başlarken ${Daily} Miktar Para Verdim`)] })
        }
        if (User && User.Coin < Bahis) return ctx.reply({ embeds: [embed.setColor("RANDOM").setDescription(`<@${ctx.user.id}> Dostum hile Yapma Paran Yetmiyor `).setColor("RANDOM")] })
        await ctx.reply({ embeds: [embed.setDescription(`${await Emoji("flip")} Lütfen Bekleyin Zariniz Atiliyor`)] }).catch(e => console.log({}))
        setTimeout( async function(){ 
            if (cf >= 14) {
                await UserModal.updateOne({ Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin + Bahis) } }, { upsert: true }).catch(e => { console.error("hata var") })
                return await ctx.editReply({ embeds: [embed.setDescription(`Yatirdiğiniz Parayinin 2katını Kazandiniz Güncel Paraniz ${User.Coin}`).setColor("313131")] }).catch(e => console.log({}))
            }
            if (cf <= 16) {
                await UserModal.updateOne({ Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin - Bahis) } }, { upsert: true }).catch(e => { console.error("hata var") })
                return await ctx.editReply({ embeds: [embed.setDescription(`Yatirdiğiniz Parayi Kaybettiniz Güncel Paraniz ${User.Coin}`).setColor("RED")] }).catch(e => console.log({}))
            } 
        }, 3000);
       



    }
}
module.exports = Commands
