const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const Guild = Underline.Model.Guild
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kayıt")
        .setDescription("belirlediğiniz kişi kayit eder"),
    run: async (ctx) => {
        if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
        })

    }
};