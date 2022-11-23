const config = global.config
const client = global.client
const slots = [':grapes:', ':tangerine:', ':pear:', ':cherries:', ':lemon:'];
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "slot"
        this.description = "slot komutudur"
        this.options =
            [{
                type: 3,
                description: `yatiricağiniz bahis miktarı`,
                name: "bahis",
            }]
            this.on = true
    }
    async execute(ctx) {
        function Emoji(e) {
            return client.emojis.cache.find((emojis) => emojis.name === e);
        }
        const Bahis = ctx.options._hoistedOptions[0] ? ctx.options._hoistedOptions[0].value : 1
        const User = await UserModal.findOne({ Member: ctx.user.id })
        if (isNaN(Bahis)) return ctx.reply({ embeds: [embed.setDescription(`Hadi Ama Sadece Sayi`)] })

        const Daily = Math.floor(Math.random() * 300)
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
        ctx.reply({ embeds: [embed.setDescription(`${slots[Math.floor(Math.random() * slots.length)]} ${slots[Math.floor(Math.random() * slots.length)]} ${slots[Math.floor(Math.random() * slots.length)]}`)] })
        for (let i = 0; i < 5; i++) {
            setTimeout(function () {
                ctx.editReply({ embeds: [embed.setDescription(`${slots[Math.floor(Math.random() * slots.length)]} ${slots[Math.floor(Math.random() * slots.length)]} ${slots[Math.floor(Math.random() * slots.length)]}`)] })
            }, 1000);
        }
        var slot1 = slots[Math.floor(Math.random() * slots.length)];
        var slot2 = slots[Math.floor(Math.random() * slots.length)];
        var slot3 = slots[Math.floor(Math.random() * slots.length)];
        setTimeout(async function () {
            if(slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
              return  ctx.editReply({
                    embeds: [embed.setColor("GREEN").setDescription(`
                \n ${slot1} ${slot2} ${slot3} \n\n
                Yatardiğiniz Miktari Geri Aldınız ${Emoji("hello")}
                `)]
                });
            }
            if (slot1 === slot2 && slot1 === slot3) {
                ctx.editReply({
                    embeds: [embed.setColor("GREEN").setDescription(`
                \n ${slot1} ${slot2} ${slot3} \n\n
                Bahisinizi 3Katladınız ${await Emoji("hello")}
                `)]
                });
                await UserModal.updateOne({ Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin+(2 * Bahis))  } }, { upsert: true }).catch(e => { console.error("hata var") })

            } else {
                ctx.editReply({
                    embeds: [embed.setColor("RED").setDescription(`
                \n ${slot1} ${slot2} ${slot3} \n\n Kaybettin ${Emoji("sad")}
                `)]
                });
                await UserModal.updateOne({  Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin-Bahis)  } }, { upsert: true }).catch(e => { console.error("hata var") })
            }
        }, 1000);




    }
}
module.exports = Commands
