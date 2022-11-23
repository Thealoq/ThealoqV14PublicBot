const config = global.config
const client = global.client
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const UserModal = require("../schema/User")
class Commands {
    constructor() {
        this.name = "blackjack"
        this.description = "blackjack komutudur"
        this.options =
            [{
                type: 4,
                description: `yatiricağiniz bahis miktarı`,
                name: "bahis",
            }]
            
    }
    async execute(ctx) {
        const Bahis = ctx.options._hoistedOptions[0] ? ctx.options._hoistedOptions[0].value : 1
        const User = await UserModal.findOne({ Member: ctx.user.id })
        const Daily = Math.floor(Math.random() * 300)
        let PlayerCardsArray = []
        let EnemyCardsArray = []
        PlayerCardsArray.push(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20))
        EnemyCardsArray.push(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20))
        let embed = new MessageEmbed()
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('battle')
                    .setEmoji(`👊`)
                    .setStyle('SUCCESS'))
            .addComponents(
                new MessageButton()
                    .setCustomId('stop')
                    .setStyle('DANGER')
                    .setEmoji(`🛑`))
        if (!User) {
            new UserModal({
                Member: ctx.user.id,
                Coin: Daily,
                Status: true,
                Pets: []
            }).save()
            ctx.reply({ embeds: [embed.setDescription(`Seni Burda İlk Defa Görüyorum Aramıza Hoş Geldin <@${ctx.user.id}>  🎂 \n Ayrica Sana Başlarken ${Daily} Miktar Para Verdim`)] })
        }
        if(isNaN(Bahis)) return ctx.reply({ embeds: [embed.setDescription(`Hadi Ama Sadece Sayi`)] })
        if (User && User.Coin < Bahis ) return ctx.reply({ embeds: [embed.setDescription(`<@${ctx.user.id}> Dostum hile Yapma Paran Yetmiyor `).setColor("RED")] })
        function Say(Array) {
            var toplam = 0;
            for (var i = 0; i < Array.length; i++) {
                if (isNaN(Array[i])) {
                    continue;
                }
                toplam += Number(Array[i]);
            }
            return toplam
        }
        await ctx.reply({ embeds: [embed.setDescription(`${Say(EnemyCardsArray)} Düşmanın Kartlari \n ${Say(PlayerCardsArray)} Senin Kartlari`)], components: [row] }).catch(e => console.log({ }))
        const filter = i => i.user.id === ctx.member.id;
        const collector = ctx.channel.createMessageComponentCollector({ filter, time: 60000 });
        collector.on('collect', async b => {
            if (b.isButton()) {
                if (b.customId === "battle") {
                    PlayerCardsArray.push(Math.floor(Math.random() * 20))
                    if (Say(PlayerCardsArray) >= 21) {
                        row.components[1].setDisabled(true) 
                        await ctx.editReply({ embeds: [embed.setDescription(`${User.Coin ? Coin : 0  -Bahis} Kaybettiniz`).setColor("RED")], components: [row] }).catch(e => console.log({ }))
                        await UserModal.updateOne({  Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin-Bahis)  } }, { upsert: true }).catch(e => { console.error("hata var") })
                        row.components[0].setDisabled(true) 
                    } 
                    if(Say(PlayerCardsArray) <= 21) return  await ctx.editReply({ embeds: [embed.setDescription(`${Say(EnemyCardsArray)} Düşmanın Kartlari \n ${Say(PlayerCardsArray)} Senin Kartlari`)], components: [row] })
                }
                if (b.customId == "stop") {
                    EnemyCardsArray.push(Math.floor(Math.random() * 20))
                    row.components[0].setDisabled(true) 
                    if (Say(EnemyCardsArray) >= 21) {
                         await ctx.editReply({ embeds: [embed.setDescription(`Yatirdiğiniz Parayinin 2katını Kazandiniz Güncel Paraniz ${User.Coin+Bahis}`).setColor("GREEN")] }).catch(e => console.log({ }))
                        await UserModal.updateOne({ Member: ctx.member.id }, { $set: { Coin: parseInt(User.Coin+Bahis) } }, { upsert: true }).catch(e => { console.error("hata var") })
                         row.components[0].setDisabled(true) 
                         row.components[1].setDisabled(true) 
                    }
                    if(Say(PlayerCardsArray) <= 21) return await ctx.editReply({ embeds: [embed.setDescription(`${Say(EnemyCardsArray)} Düşmanın Kartlari \n ${Say(PlayerCardsArray)} Senin Kartlari`)] })
                }
            }
        })

    }
}
module.exports = Commands
