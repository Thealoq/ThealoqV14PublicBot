const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    options : {
        developer: true,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test komutu")
        .addStringOption(option => option.setRequired(true).setName('id').setDescription('id')),
    run: async (ctx) => {
        const inputID = ctx.options.getString('id'); 
        const member = ctx.guild.members.cache.get(inputID);
        if (member) {
            const voiceState = member.voice;
            
            if (voiceState) {
              voiceState.setMute(true)
                .then(() => {
                  ctx.reply(`${member.user.tag} adlı üye sessize alındı.`);
                })
                .catch(console.error);
            } else {
                ctx.reply(`${member.user.tag} adlı üye bir sesli kanalda değil.`);
            }
          } else {
            ctx.reply("Üye bulunamadı.");
          }
    }
};
