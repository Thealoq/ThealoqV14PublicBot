const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder , PermissionsBitField} = require("discord.js");
const Guild = Underline.Model.Guild
const client = Underline.Ghost

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tag")
        .setDescription("taglı alım açar veya kapatır")
        .addBooleanOption((option) => option.setName("status").setDescription("açık veya kapalı ayarliyabilirsin").setRequired(true)),
    run: async (ctx) => {
        if(!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`, 
          })
        const Status = ctx.options._hoistedOptions.filter( t => t.name == "status")
        if(!Status) return
        const GuildSettings = await Guild.findOne({ GuildID: ctx.guild.id })
        if(!GuildSettings) {
            new Guild({ 
                GuildID: ctx.guild.id,
                Status: null,
                Welcome: null,
                Unregister: null,
                WelcomeName: null,
                GenelCh: null,
                WelRole: null,
                MemberRole: null,
                OwnerID: null,
                Tag: null,
                TagCheck: Status[0].value
            }).save()
        } else {
            await Guild.updateOne({ GuildID: ctx.guild.id },{
                TagCheck: Status[0].value
             })
        }
        ctx.reply({ embeds: [new EmbedBuilder()
            .setColor("Aqua")
            .setFooter({ text: config.footer.toString() })
            .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
            .setDescription(`TaglıAlım \`${Status[0].value ? "Açık": "Kapalı"}\` Konuma Getirildi`)]
        })
    }
};