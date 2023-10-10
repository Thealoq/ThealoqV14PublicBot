const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Guild = Underline.Model.GuildSettings
const client = Underline.Thealoq
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("kayıtbilgi")
        .setDescription("Kayıt Bilgilerini Gösterir"),
    run: async (ctx) => {
        const Settings = await Guild.findOne({ GuildID: ctx.guild.id })
        if(!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`, 
          })
        console.log(Settings);
        if(!Settings && Settings == null) {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Aqua")
                .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                .setDescription(`[\`❌\`] Dostum Sunucuda Daha Önceden Kayıt Kurmadin! `)
            ]
            })
        } else {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Aqua")
                .setFooter({ text: config.footer, iconURL:  ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                .setFields(
                    {
                        name: "Üye Rol",
                        value: `<@&${Settings.Role}>`,
                        inline: true
                    },
                    {
                        name: "Hos Geldin Kanalı",
                        value: `<#${Settings.WelcomCh}>`,
                        inline: true
                    },
                    {
                        name: "Kurallar Kanalı",
                        value: `<#${Settings.RulesCh}>`,
                        inline: true
                    },
                    {
                        name: "Cezalı Rol",
                        value: `<@&${Settings.JailRole}>`,
                        inline: true
                    },
                ).setDescription(`Sunucu Ayarı Durumu:[\`${Settings.Status}\`]`)]
                })
        }
       
    }
};