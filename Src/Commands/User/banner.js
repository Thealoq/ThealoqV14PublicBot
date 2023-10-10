const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("banner")
        .setDescription("Girdiğiniz İddeki Kişinin Bannerını Gosterir")
        .addStringOption((option) => option.setRequired(false).setName('id').setDescription('Just enter the id')),
    run: async (ctx) => {
        const submit = ctx.options.getString("id")
        const veri = submit ? submit : ctx.user.id
        const url = `https://discordapp.com/api/v8/users/${veri}`;
        const headers = {
            'Authorization': `Bot ${config.token}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        const json = await response.json();
        if(!json.avatar) return
        if (json.banner) return ctx.reply(`https://cdn.discordapp.com/banners/${veri}/${json.banner}.${json.banner.startsWith("a_") ? "gif" : "png"}?size=2048`)
        else return ctx.reply("No banner")
    }
}