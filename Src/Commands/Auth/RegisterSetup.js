const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const Guild = Underline.Model.GuildSettings
const footer = config.footer
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("kayıtkur")
        .setDescription("Kayıt Kur!")
        .addBooleanOption((option) => option.setRequired(true).setName('durumu').setDescription('Açık Veya Kapalı Ayarliyabilirsin'))
        .addRoleOption((option) => option.setName("jail").setDescription("Cezalı Rolü").setRequired(false))
        .addChannelOption((option) => option.setName("kurallar").setDescription("kurallar Kanalı").setRequired(false))
        .addChannelOption((option) => option.setName("kanal").setDescription("Hoş Geldin Kanalı Seçin").setRequired(false))
        .addRoleOption((option) => option.setName("üyerol").setDescription("Yeni Üyelere Verilen Rol").setRequired(false)),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })
        const Jail = ctx.options.getRole("jail")
        const Kanal = ctx.options.getChannel('kanal');
        const Kurallar = ctx.options.getChannel('kurallar');
        const UyeRole = ctx.options.getRole('üyerol');
        const Status = ctx.options.getBoolean('durumu');
        console.log(Status,UyeRole);
        const GuildSettings = await Guild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) {
            await new Guild({
                GuildID: ctx.guild.id,
                Status: Status ? Status : Guild.Status,
                Role: UyeRole ? UyeRole.id  : Guild.Role,
                RulesCh: Kurallar ? Kurallar.id  : Guild.RulesCh,
                WelcomCh: Kanal ? Kanal.id  : Guild.WelcomCh,
                JailRole: Jail ? Jail.id  : Guild.JailRole,
            }).save()
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: footer, iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                    .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                    .setFields(
                        {
                            name: "Üye Rol",
                            value: `${UyeRole}`,
                            inline: true
                        },
                        {
                            name: "Hos Geldin Kanalı",
                            value: `${Kanal}`,
                            inline: true
                        },
                        {
                            name: "Kurallar Kanalı",
                            value: `${Kurallar}`,
                            inline: true
                        },
                        {
                            name: "Cezalı Rol",
                            value: `${Jail}`,
                            inline: true
                        },
                    ).setDescription(`Sunucu Ayarı - Durumu:[\`${Status}\`]`)]
            })
        } else {
            await Guild.findOneAndUpdate({ GuildID: ctx.guild.id }, {
                GuildID: ctx.guild.id,
                Status: Status ? Status : Guild.Status,
                Role: UyeRole ? UyeRole.id  : Guild.Role,
                RulesCh: Kurallar ? Kurallar.id  : Guild.RulesCh,
                WelcomCh: Kanal ? Kanal.id  : Guild.WelcomCh,
                JailRole: Jail ? Jail.id  : Guild.JailRole,
            })
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: footer, iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                    .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                    .setFields(
                        {
                            name: "Üye Rol",
                            value: `${UyeRole}`,
                            inline: true
                        },
                        {
                            name: "Hos Geldin Kanalı",
                            value: `${Kanal}`,
                            inline: true
                        },
                        {
                            name: "Kurallar Kanalı",
                            value: `${Kurallar}`,
                            inline: true
                        },
                        {
                            name: "Cezalı Rol",
                            value: `${Jail}`,
                            inline: true
                        },
                        
                    ).setDescription(`Sunucu Ayarı Güncellendi Durumu:[\`${Status}\`]`)]
            })
        }

    }
};