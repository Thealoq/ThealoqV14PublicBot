
const client = Underline.Thealoq
const { Events: Event,
    EmbedBuilder, ChannelType,PermissionsBitField
    ,ModalBuilder ,TextInputBuilder,TextInputStyle,ActionRowBuilder
} = require("discord.js")
const Discord = require("discord.js")
const SecretVoice = Underline.Model.SecretVoice
class Events {
    constructor() {
        this.name = Event.InteractionCreate
    }
    async execute(ctx) {

        const obj = {
            SesPanel0: SesPanel0,
            SesPanel1: SesPanel1,
            SesPanel2: SesPanel2,
            SesPanel3: SesPanel3,
            SesPanel4: SesPanel4,
            SesPanel5: SesPanel5,
            SesPanel6:SesPanel6,
            SesPanel7:SesPanel7
        }
        if (ctx.isButton()) {
            const GuildVoice = await SecretVoice.findOne({ GuildID: ctx.guild.id })
            const UserVoice = await SecretVoice.findOne({ GuildID: ctx.guild.id, Member: ctx.user.id  })
            if (ctx.isButton()) {
                const func = obj[ctx.customId];
                if (typeof func === "function") func(ctx,GuildVoice,UserVoice,client);
            }
        }

    }
}
module.exports = Events

async function SesPanel0(ctx,GuildVoice,UserVoice) {
    if(UserVoice?.Channel) return ctx.reply({ content: "Zaten Kanalın Var" ,ephemeral: true  })
    if(GuildVoice?.Channel) {
        ctx.guild.channels.create({
            name: `${ctx.user.displayName} Private Room`,
            type: ChannelType.GuildVoice,
            parent: GuildVoice.Channel
        }).then(channel => {
            const waitTimeInSeconds = 30;
            setTimeout(async () => {
                if (channel.members.size === 0) {
                    await channel.delete().catch(console.error);
                   await SecretVoice.deleteOne({
                        GuildID: ctx.guild.id,
                        Member: ctx.user.id,
                    })
                }
            }, waitTimeInSeconds * 1000)
            if(!UserVoice) {
                new SecretVoice({
                    GuildID: ctx.guild.id,
                    Member: ctx.user.id,
                    Channel: channel.id
                }).save()
            } else {
                SecretVoice.findOneAndUpdate({
                    GuildID: ctx.guild.id, Member: ctx.user.id,
                },{
                    Channel: channel.id
                })
            }
        })
    } else {
        ctx.reply({ content: "Katagori Yok" ,ephemeral: true  })
    }


}
async function SesPanel1(ctx,GuildVoice,UserVoice,client) {
    if(!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin" ,ephemeral: true  })
    const Voice = client.channels.fetch(UserVoice.Channel).then(chn => {
        chn.permissionOverwrites.set([
            {
                id:ctx.guild.id,
                deny: [PermissionsBitField.Flags.Connect],
            },
            {
                id:ctx.user.id,
                allow: [PermissionsBitField.Flags.Connect],
            }
        ])
        ctx.reply({ content: "Başariyla Kitlendi 🔒" ,ephemeral: true  })
    })
}
async function SesPanel2(ctx,GuildVoice,UserVoice,client) {
    if(!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin" ,ephemeral: true  }).catch(console.error)
    const Voice = client.channels.fetch(UserVoice.Channel).then(chn => {
        chn.permissionOverwrites.set([
            {
                id:ctx.guild.id,
                allow: [PermissionsBitField.Flags.Connect],
            }
        ])
        ctx.reply({ content: "Başariyla Kitlendi 🔒" ,ephemeral: true  }).catch(console.error)
    })
}
async function SesPanel3(ctx,GuildVoice,UserVoice,client) {
    if(!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin" ,ephemeral: true  }).catch(console.error)
    const modal = new ModalBuilder()
        .setCustomId('secret3')
        .setTitle('SecretVoice');
    const VoiceLimit = new TextInputBuilder()
        .setCustomId('voicelimit')
        .setMaxLength(99)
        .setLabel("Ses Limit Belirleyin")
        .setStyle(TextInputStyle.Short);
    const ModalRow = new ActionRowBuilder().addComponents(VoiceLimit);
    modal.addComponents(ModalRow);
    await ctx.showModal(modal);
    const filter = (interaction) => interaction.customId === 'secret3';
    ctx.awaitModalSubmit({ filter, time: 15_000 })
        .then(interaction => {
            const hobbies = interaction.fields.getTextInputValue('voicelimit');
            const Voice = client.channels.fetch(UserVoice.Channel).then(chn => {
                chn.setUserLimit(hobbies[0])
            })
            interaction.reply({ content: `Başariyla ${hobbies[0]} Limit Ayarlandi` ,ephemeral: true  }).catch(console.error)
        })
        .catch(console.error);
}
async function SesPanel4(ctx,GuildVoice,UserVoice) {
    if(!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin" ,ephemeral: true  }).catch(console.error)
    const modal = new ModalBuilder()
        .setCustomId('secret4')
        .setTitle('SecretVoice');
    const VoiceLimit = new TextInputBuilder()
        .setCustomId('channellimit')
        .setLabel("Bir İd Belirleyin")
        .setStyle(TextInputStyle.Short);
    const ModalRow = new ActionRowBuilder().addComponents(VoiceLimit);
    modal.addComponents(ModalRow);
    await ctx.showModal(modal);
    const filter = (interaction) => interaction.customId === 'secret4';
    ctx.awaitModalSubmit({ filter, time: 15_000 })
        .then(async interaction => {
            const hobbies = interaction.fields.getTextInputValue('channellimit');
            await SecretVoice.findOneAndUpdate({
                GuildID: ctx.guild.id,
                Member: ctx.user.id,
            },{
                Member: hobbies
            })
            interaction.reply({ content: `Başariyla <@${hobbies}> Kanal Transfer Edildi` ,ephemeral: true  }).catch(console.error)
        })
        .catch(console.error);
}
async function SesPanel5(ctx,GuildVoice,UserVoice,client) {
    if(!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin" ,ephemeral: true  }).catch(console.error)
    client.channels.fetch(UserVoice.Channel).then(t => t.delete(),ctx.reply({ content: "Başariyla Kanal Silindi" ,ephemeral: true })).catch(console.error)
     await SecretVoice.deleteOne({
        GuildID: ctx.guild.id,
        Member: ctx.user.id,
    })
}
async function SesPanel6(ctx, GuildVoice, UserVoice, client) {
    if (!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin", ephemeral: true }).catch(console.error)

    const modal = new ModalBuilder()
        .setCustomId('secret6')
        .setTitle('SecretVoice');
    const VoiceLimit = new TextInputBuilder()
        .setCustomId('banned')
        .setLabel("Banliycağiniz İd Belirleyin")
        .setStyle(TextInputStyle.Short);
    const ModalRow = new ActionRowBuilder().addComponents(VoiceLimit);
    modal.addComponents(ModalRow);
    await ctx.showModal(modal);
    const filter = (interaction) => interaction.customId === 'secret6';
    try {
        const interaction = await ctx.awaitModalSubmit({ filter, time: 15_000 });
        const hobbies = interaction.fields.getTextInputValue('banned');
        const mbrs = ctx.guild.members.cache.get(hobbies)
        mbrs.voice.disconnect().catch(console.error);
        client.channels.fetch(UserVoice.Channel).then(chn => {
            chn.permissionOverwrites.set([
                {
                    id: hobbies,
                    deny: [PermissionsBitField.Flags.Connect],
                },
            ])
            chn.permissionOverwrites.delete(hobbies);
            interaction.reply({ content: `Başariyla ${mbrs} Kanaldan Banlandi/Açildi`, ephemeral: true }).catch(console.error)
        }).catch(console.error);
    } catch (error) {
        console.error(error);
        ctx.reply({ content: "Bir hata oluştu. Üye banlanamadı.", ephemeral: true }).catch(console.error);
    }
}
async function SesPanel7(ctx, GuildVoice, UserVoice, client) {
    if (!UserVoice) return ctx.reply({ content: "Bir Kanal Sahip Değilsin", ephemeral: true }).catch(console.error)

    const modal = new ModalBuilder()
        .setCustomId('secret7')
        .setTitle('SecretVoice');
    const VoiceLimit = new TextInputBuilder()
        .setCustomId('channellimit')
        .setLabel("Kanal İsmi Belirleyin")
        .setStyle(TextInputStyle.Short);
    const ModalRow = new ActionRowBuilder().addComponents(VoiceLimit);
    modal.addComponents(ModalRow);
    await ctx.showModal(modal);
    const filter = (interaction) => interaction.customId === 'secret7';
    try {
        const interaction = await ctx.awaitModalSubmit({ filter, time: 15_000 });
        const hobbies = interaction.fields.getTextInputValue('channellimit');
        const channel = await client.channels.fetch(UserVoice.Channel);
        await channel.setName(hobbies);
        await interaction.reply({ content: `Başariyla ${hobbies} Kanal İsmi Ayarlandi`, ephemeral: true }).catch(console.error)
    } catch (error) {
        console.error(error);
        ctx.reply({ content: "Bir hata oluştu. Kanal ismi ayarlanamadı.", ephemeral: true });
    }
}

module.exports = Events
