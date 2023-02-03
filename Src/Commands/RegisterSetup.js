const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const Guild = Underline.Model.Guild
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kayıtkur")
        .setDescription("kayıt kur!")
        .addStringOption((option) => option.setRequired(true).setName('durumu').setDescription('açık veya kapalı ayarliyabilirsin')
        .addChoices(
            { name: 'açık', value: 'açık' },
            { name: 'kapalı', value: 'kapalı' },
        ))
        .addRoleOption((option) => option.setName("kayıtsız").setDescription("kayıtsız verilicek rol").setRequired(true))
        .addRoleOption((option) => option.setName("yetkili").setDescription("komutlari kullanicak rol").setRequired(true))
        .addChannelOption((option) => option.setName("kanal").setDescription("hoş geldin kanalı seçin").setRequired(true))
        .addChannelOption((option) => option.setName("genel").setDescription("kayıt sonrasi gelicek hoş geldin mesaji ").setRequired(true))
        
        .addStringOption((option) => option.setRequired(true).setName('otoisim').setDescription('sunucuya girdiğinde isimi otomatik değişsin mi')
            .addChoices(
                { name: 'evet', value: 'evet' },
                { name: 'hayır', value: 'hayır' },
            ))
        .addStringOption((option) => option.setRequired(true).setName('otorol').setDescription('sunucuya girdiğinde isimi otomatik değişsin mi')
            .addChoices(
                { name: 'evet', value: 'evet' },
                { name: 'hayır', value: 'hayır' },
            ))
        .addRoleOption((option) => option.setName("üyerol").setDescription("lütfen kayıt sonrasi için bir rol seçin").setRequired(true)
        ).addStringOption(option =>
            option.setName('tag')
                .setDescription('belirlediğiniz tagi ekler')),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })
        const kanal = ctx.options._hoistedOptions.filter(t => t.name == "kanal")
        const Tag = ctx.options._hoistedOptions.filter(t => t.name == "tag")
        const kayıtsız = ctx.options._hoistedOptions.filter(t => t.name == "kayıtsız")
        const Owner = ctx.options._hoistedOptions.filter(t => t.name == "yetkili")
        const üyerol = ctx.options._hoistedOptions.filter(t => t.name == "üyerol")
        const otoisim = ctx.options._hoistedOptions.filter(t => t.name == "otoisim")
        const otorol = ctx.options._hoistedOptions.filter(t => t.name == "otorol")
        const genel = ctx.options._hoistedOptions.filter(t => t.name == "genel")
        const Status = ctx.options._hoistedOptions.filter(t => t.name == "durumu")
        const GuildSettings = await Guild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) {
            await new Guild({
                GuildID: ctx.guild.id,
                Status: Status[0].value,
                Welcome: kanal[0].value,
                Unregister: kayıtsız[0].value,
                WelcomeName: otoisim[0].value,
                GenelCh: genel[0].value,
                WelRole: otorol[0].value,
                MemberRole: üyerol[0].value,
                OwnerID: Owner[0].value,
                Tag: Tag[0] ? Tag[0].value : null,
            }).save()
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: config.footer.toString(), iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                    .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                    .setFields(
                        {
                            name: "Kayıt Kanalı",
                            value: `<#${kanal[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Kayıtsız Rol",
                            value: `<@&${kayıtsız[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Yetkili Rol",
                            value: `<@&${Owner[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Oto isim açık mı ?",
                            value: otoisim[0].value,
                            inline: true
                        },
                        {
                            name: "Üye Rolü",
                            value: `<@&${üyerol[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Sohbet Kanalı",
                            value: `<#${genel[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Oto Rol Açık mı ?",
                            value: otorol[0].value,
                            inline: true
                        },
                        {
                            name: "Sunucuzda Tag",
                            value: Tag[0] ? Tag[0].value : "Belirlenmedi",
                            inline: true
                        },
                    ).setDescription(`Sunucu Ayarı - Durumu:[\`${Status[0].value}\`]`)]
            })
        } else {
            await Guild.findOneAndUpdate({ GuildID: ctx.guild.id }, {
                GuildID: ctx.guild.id,
                Status: Status[0].value,
                Welcome: kanal[0].value,
                Unregister: kayıtsız[0].value,
                WelcomeName: otoisim[0].value,
                GenelCh: genel[0].value,
                WelRole: otorol[0].value,
                OwnerID: Owner[0].value,
                Tag: Tag[0] ? Tag[0].value : null,
                MemberRole: üyerol[0].value,
            })
            console.log(Tag[0] ? Tag[0].value : null);
            ctx.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Aqua")
                    .setFooter({ text: config.footer.toString(), iconURL: ctx.guild.iconURL({ dynamic: true, type: "png" }) })
                    .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
                    .setFields(
                        {
                            name: "Kayıt Kanalı",
                            value: `<#${kanal[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Kayıtsız Rol",
                            value: `<@&${kayıtsız[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Oto isim açık mı ?",
                            value: otoisim[0].value,
                            inline: true
                        },
                        {
                            name: "Yetkili Rol",
                            value: `<@&${Owner[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Kız Yetkili Rolü",
                            value: `<@&${üyerol[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Sohbet Kanalı",
                            value: `<#${genel[0].value}>`,
                            inline: true
                        },
                        {
                            name: "Oto Rol Açık mı ?",
                            value: otorol[0].value,
                            inline: true
                        },
                        {
                            name: "Sunucuzda Tag",
                            value: Tag[0] ? Tag[0].value : "Belirlenmedi",
                            inline: true
                        },
                    ).setDescription(`Sunucu Ayarı Güncellendi Durumu:[\`${Status[0].value}\`]`)]
            })
        }

    }
};