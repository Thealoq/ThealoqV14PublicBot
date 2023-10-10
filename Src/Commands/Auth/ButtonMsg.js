const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder,ButtonBuilder, ActionRowBuilder, Attachment, PermissionsBitField } = require("discord.js");
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
        .setName("butonmesaji")
        .setDescription("Butonlu Rol Mesaj Atar!"),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })
        const GuildSettings = await RoleGuild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) {
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: config.footer, iconURL: client.user.avatarURL({ dynamic: true, type: "png" }) })
                    .setDescription(`[\`❌\`] Dostum Sunucuda Verin Yok! `)
                ]
            })
        } else {
            const Content = GuildSettings.ButtonRole.map((e, i) => {
                return (
                    `${e.Emoji} | ${e.Name}`
                )
            }).join('\n')

            const buttons = GuildSettings.ButtonRole.map((item, index) => {
                return new ButtonBuilder()
                    .setCustomId("role" + index)
                    .setLabel(item.Name)
                    .setStyle("Secondary");
            });
            
            const rows = [];
            let currentRow = new ActionRowBuilder();
            buttons.forEach((button, index) => {
                currentRow.addComponents(button);
                if ((index + 1) % 5 === 0 || index === buttons.length - 1) {
                    rows.push(currentRow);
                    currentRow = new ActionRowBuilder();
                }
            });
            
            ctx.reply({
                content: Content,
                components: rows
            });
            
            

            
        }
    }
};