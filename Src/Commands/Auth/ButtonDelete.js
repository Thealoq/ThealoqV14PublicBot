const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const RoleGuild = Underline.Model.ButtonRoleGuild
const client = Underline.Thealoq
const footer = config.footer
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("butonsilme")
        .setDescription("Butonlu Rol Verisi Silme!"),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })
        const GuildSettings = await RoleGuild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Aqua")
                .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                .setDescription(`[\`❌\`] Dostum Sunucuda Verin Yok! `)
            ]
            })
        } else {
            RoleGuild.findOneAndDelete({ GuildID: ctx.guild.id }, (err, result) => {
                if (err) {
                    ctx.reply({ embeds: [new EmbedBuilder()
                        .setColor("Red")
                        .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                        .setDescription(`[\`❌\`] Bir Hata Oldu! `)
                    ]
                    })
                } else {
                    ctx.reply({ embeds: [new EmbedBuilder()
                        .setColor("Aqua")
                        .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                        .setDescription(`[\`✔️\`] Dostum Başariyla Sildin! `)
                    ]
                    })
                }
            })
        }
    }
};