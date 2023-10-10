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
        .setName("butonrol")
        .setDescription("Butonlu Rol Verme Kur!")
        .addRoleOption((option) => option.setName("role").setDescription("Eklenicek rol").setRequired(true))
        .addStringOption((option) => option.setName("name").setDescription("Verilicek İsim").setRequired(true))
        .addStringOption((option) => option.setName("emoji").setDescription("Gösterilicek Emoji").setRequired(true)),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })

        const Role = ctx.options.getRole("role")
        const Emoji = ctx.options.getString('emoji');
        const Name = ctx.options.getString('name');
        const GuildSettings = await RoleGuild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) {
            await new RoleGuild({
                GuildID: ctx.guild.id,
                ButtonRole: {
                    Emoji: Emoji,
                    Name: Name,
                    Role: Role.id,
                }
            }).save()
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: footer, iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                    .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                    .setFields(
                        {
                            name: "Emoji Eklendi",
                            value: `${Emoji} | ${Name} : ${Role}`,
                            inline: true
                        },
                    ).setDescription(`[🫡] Ayarlandi`)]
            })
        } else {
          
                await GuildSettings.ButtonRole.push({
                    Emoji: Emoji,
                    Name: Name,
                    Role: Role.id,
                })
                GuildSettings.save()
                ctx.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Aqua")
                        .setFooter({ text: footer, iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                        .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                        .setFields(
                            {
                                name: "Emoji Eklendi",
                                value: `${Emoji} | ${Name} : ${Role}`,
                                inline: true
                            },
                        ).setDescription(`[🫡] Güncellendi`)]
                })
           
        }
    }
};