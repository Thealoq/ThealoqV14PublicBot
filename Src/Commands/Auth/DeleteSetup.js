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
        .setName("kayıtsil")
        .setDescription("Sunucudaki Kayitli Bilgileriniz Databaseden Siler"),
    run: async (ctx) => {
        const Settings = await Guild.findOne({ GuildID: ctx.guild.id })
        if(!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`, 
          })
          console.log(Settings);
        if(!Settings && Settings == null) {
            ctx.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                .setDescription(`[\`❌\`] Dostum Sunucuda Daha Önceden Kayıt Kurmadin! `)
                ]
            })
        } else {
            Guild.findOneAndDelete({ GuildID: ctx.guild.id }, (err, result) => {
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
            });
           
           
        }
       
    }
};