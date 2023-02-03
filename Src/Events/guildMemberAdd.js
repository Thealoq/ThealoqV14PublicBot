
const config = global.config
const client = Underline.Ghost
const Guild = Underline.Model.Guild
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const moment = require("moment");
const ms = require("ms");
moment.locale("tr");
class Events {
    constructor() {
        this.name = "guildMemberAdd"
    }
    async execute(member) {

        let Status = " "
        if (Date.now() - member.user.createdAt < ms("7d")) {
            Status = `🔴 Güvenli Değil`
        } else {
            Status = `🟢 Güvenli`
        }
        const GuildSettings = await Guild.findOne({ GuildID: member.guild.id })
        if (!GuildSettings) return
        if(GuildSettings.WelRole == "evet") {
            member.roles.add(GuildSettings.Unregister).catch(e => false)
        }

        if(GuildSettings.WelcomeName == "evet") {
            member.setNickname(`🕵️ İsim | Yaş`).catch(e => false)
        }

        if (GuildSettings.Status) {
        let channel = client.channels.cache.get(GuildSettings.Welcome)
        if(!channel) return
        channel.send({ content: `<@${member.id}> Sunucuya Giriş Yapti:${member.id}`,
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setAuthor({ name: `Yeni Bir Kullanıcı Katıldı, 👋 ${member.user.username}`, iconURL: member.guild.iconURL({ dynamic: true }) })
                    .setFooter({ text: config.footer.toString(), iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                    .setThumbnail(member.user.avatarURL({ dynamic: true, type: "png" }))
                    .setDescription(`
        👷‍♂️ **Sunucumuza hoş geldin ${member}**
        ✨ **Seninle birlikte ${member.guild.memberCount} kişiyiz.** 
        🍫 **Kayıt olmak için yetkilileri beklemen yeterlidir.** 
            > ⚒️ **Hesap oluşturulma tarihi: \`${moment(member.user.createdTimestamp).format("LLL")}\`** 
            > 🤹 **Güvenilirlik durumu: ${Status}**  
        `)
                ], components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`kayıt`)
                                .setLabel("👋 Kayıt İçin Tıkla")
                                .setStyle("1"))
                ]
            })
        }
    }
}
module.exports = Events
