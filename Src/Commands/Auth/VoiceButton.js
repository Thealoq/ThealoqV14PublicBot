const { SlashCommandBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require("discord.js")
const Discord = require("discord.js");
const fetch = require('node-fetch');
const SecretVoice = Underline.Model.SecretVoice

module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("sespanel")
        .setDescription("Ses Panelini Gönderir"),
    run: async (ctx) => {
        const GuildVoice = SecretVoice.findOne({ GuildID: ctx.guild.id })
        let SesArray = [
            { Label:"🔉"},
            { Label:"🔒"},
            { Label:"🔓"},
            { Label:"🙍‍♂️"},
            { Label:"🪪"},
            { Label:"🗑️"},
            { Label:"🙅‍♂️"},
            { Label:"🖊️"}]

        const row1 = new ActionRowBuilder()
            .addComponents(
                SesArray.slice(0, 4).map((x, i) => {
                    return new ButtonBuilder()
                        .setCustomId("SesPanel" + i)
                        .setEmoji(x.Label)
                        .setStyle(ButtonStyle.Success);
                })
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                SesArray.slice(4).map((x, i) => {
                    return new ButtonBuilder()
                        .setCustomId("SesPanel" + (i + 4))
                        .setEmoji(x.Label)
                        .setStyle(ButtonStyle.Success);
                })
            );

        ctx.guild.channels.create({
            name:"SecretRoom",
            type: ChannelType.GuildCategory
        }).then(async channel => {
            if(GuildVoice) {
                new SecretVoice({
                    GuildID: ctx.guild.id,
                    Channel: channel.id
                }).save()
            } else {
                SecretVoice.findOneAndUpdate({
                    GuildID: ctx.guild.id,
                },{
                    Channel: channel.id
                })
            }
            ctx.guild.channels.create({
                name: `create-voice`,
                type: ChannelType.GuildText,
                parent: channel.id,
            }).then(async e => {
                const sentMessage = await  e.send({
                    content: `Ses Paneliniz`,
                    components: [row1,row2],
                })
                sentMessage.pin()
            })
        })
    }
};


