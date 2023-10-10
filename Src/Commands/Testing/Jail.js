const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js")
const JailSchema = require("../../../@Shared/Models/JailLog.schema")

module.exports = {
    options : {
        developer: true,
        public: false,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("ceza")
        .setDescription("ceza komutudur")
        .addStringOption(option => option.setRequired(true).setName('id').setDescription('id')),
    run: async (ctx) => {


        const inputID = ctx.options.getString('id');
        let Database = await JailSchema.findOne({ GuildID: ctx.guild.id, UsedID: inputID })
        const Ceza = new ButtonBuilder().setCustomId("Ceza").setLabel("Ceza Uygula").setStyle("Primary")
        const Cancel = new ButtonBuilder().setCustomId("Cancel").setLabel("İptal ET").setStyle("Danger")
        const Row = new ActionRowBuilder().addComponents(Ceza, Cancel)
        ctx.reply({
            content: "Lütfen Seçmek İstediğiniz İşlemi Uygulayin",
            components: [Row]
        })


        const obj = {
            Ceza: CezaFunc,
            Cancel: CancelFunc
        }

        const filter = i => i.user.id === ctx.member.id;
        const collector = ctx.channel.createMessageComponentCollector({ filter, time: 60000 });
        collector.on('collect', async b => {
            if (b.isButton()) {
                const func = obj[b.customId];
                if (typeof func === "function") func(ctx, inputID);
            }
            collector.stop()
        })

    }
}

async function CezaFunc(ctx, inputID) {
    const CezaArry = [
        { label: '1. Seviye', value: '1', desc: 'Ağır Küfür: Ciddi küfür içerikli mesaj' },
        { label: '2. Seviye', value: '2', desc: 'Dini Küfür: Dini değerleri hedef alan mesaj' },
        { label: '3. Seviye', value: '3', desc: 'Reklam: Diğer sunucuları veya servisleri içeren mesaj' },
        { label: '4. Seviye', value: '4', desc: 'Kötü Davranış: Kaba ve saygısız davranışlar' },
        { label: '5. Seviye', value: '5', desc: 'Tehdit: Kullanıcıları tehdit eden içerik' }
    ];

    const select = new StringSelectMenuBuilder()
        .setCustomId('CezaReply')
        .setPlaceholder('Lütfen Bir Ceza Belirleyin')
        .setMinValues(1)
        .setMaxValues(1);
    for (const ceza of CezaArry) {
        select.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(ceza.label)
                .setDescription(ceza.desc)
                .setValue(ceza.value)
        );
    }
    const row = new ActionRowBuilder().addComponents(select);
    await ctx.editReply({
        content: 'Seçeceğiniz Cezayı Seçin',
        components: [row],
    });

    const filter = i => i.user.id === ctx.member.id;
    const collector = ctx.channel.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async b => {

        if (b.isStringSelectMenu()) {
            const selectedValue = b.values[0];
            let ExpiresAtDate = 0;
            console.log(b.value);
            async function SaveDb(Sayi, ctx) {
                await new JailSchema({ GuildID: ctx.guild.id, UsedID: inputID }, {
                    GuildID: ctx.guild.id,
                    UsedID: inputID,
                    ModID: ctx.user.id,
                    Type: "Mute",
                    CreatedAt: Date.now(),
                    ExpiresAt: Date.now() + Sayi,
                    IsActive: true,
                });
                const member = await ctx.guild.members.fetch(inputID);
                member.roles.add("1144254335010746428")
            }

            switch (selectedValue) {
                case "1":
                    ExpiresAtDate = 10 * 1000
                    SaveDb(ExpiresAtDate, ctx)
                    await ctx.editReply({
                        content: `${Date.now() + ExpiresAtDate}`,
                        components: [],
                    });
                    break;
                case "2":
                    ExpiresAtDate = 20 * 1000
                    SaveDb(ExpiresAtDate, ctx)
                    await ctx.editReply({
                        content: `${Date.now() + ExpiresAtDate}`,
                        components: [],
                    });
                    break;
                case "3":
                    ExpiresAtDate = 30 * 1000
                    SaveDb(ExpiresAtDate, ctx)
                    await ctx.editReply({
                        content: `${Date.now() + ExpiresAtDate}`,
                        components: [],
                    });
                    break;
                case "4":
                    ExpiresAtDate = 40 * 1000
                    SaveDb(ExpiresAtDate, ctx)
                    await ctx.editReply({
                        content: `${Date.now() + ExpiresAtDate}`,
                        components: [],
                    });
                    break;
                case "5":
                    ExpiresAtDate = 50 * 1000
                    SaveDb(ExpiresAtDate, ctx)
                    await ctx.editReply({
                        content: `${Date.now() + ExpiresAtDate}`,
                        components: [],
                    });
                    break;
            }
            setTimeout(async () => {
                const member = await ctx.guild.members.fetch(inputID);
                member.roles.remove("1144254335010746428")
            }, ExpiresAtDate);
        }
    })
    collector.stop();


}


async function CancelFunc(ctx) {
    ctx.editReply({
        content: "İşlem İptal Oldu ❌", components: []
    })
}
