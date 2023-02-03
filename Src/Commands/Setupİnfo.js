const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Guild = Underline.Model.Guild
const client = Underline.Ghost
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kayıtbilgi")
        .setDescription("kayıt bilgilerini gösterir"),
    run: async (ctx) => {
        const GuildSettings = await Guild.findOne({ GuildID: ctx.guild.id })
        if(!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`, 
          })
        if(!GuildSettings) {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Aqua")
                .setFooter({ text: config.footer.toString(), iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                .setDescription(`[\`❌\`] Dostum Sunucuda Daha Önceden Kayıt Kurmadin! `)
            ]
            })
        } else {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Aqua")
                .setFooter({ text: config.footer.toString(), iconURL:  ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                .setFields(
                    {
                        name:  "Kayıt Kanalı",
                        value:  `<#${GuildSettings.Welcome}>`,
                        inline: true
                    },
                    {
                        name: "Kayıtsız Rol",
                        value: `<@&${GuildSettings.Unregister}>`,
                        inline: true
                    },
                    {
                        name: "Oto isim açık mı ?",
                        value: GuildSettings.WelRole,
                        inline: true
                    },
                    {
                        name: "Yetkili Rol",
                        value: `<@&${GuildSettings.OwnerID}>`,
                        inline: true
                    },
                    {
                        name:  "Üye Rolü",
                        value:  `<@&${GuildSettings.MemberRole}>`,
                        inline: true
                    },
                    {
                        name: "Sohbet Kanalı",
                        value: `<#${GuildSettings.GenelCh}>`,
                        inline: true
                    },
                    {
                        name:  "Oto Rol Açık mı ?",
                        value: GuildSettings.WelRole,
                        inline: true
                    },
                    {
                        name:  "Sunucuzda Tag",
                        value:  GuildSettings.Tag ? GuildSettings.Tag : "Belirlenmedi",
                        inline: true
                    },
                ).setDescription(`Sunucu Ayarı`)]
                })
        }
       
    }
};