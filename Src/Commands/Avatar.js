const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("show avatar")
        .addStringOption((option) => option.setRequired(false).setName('id').setDescription('Just enter the id')),
    run: async (ctx) => {
        const submit = ctx.options._hoistedOptions.filter( t => t.name == "id")[0]
        const veri = submit ? submit.value : ctx.user.id
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
        return ctx.reply(`https://cdn.discordapp.com/avatars/${veri}/${json.avatar}.${json.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`)
    }
}