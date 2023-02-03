const config = global.config
const client = Underline.Ghost
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, getTextInputValue,PermissionsBitField  } = require("discord.js")
const Guild = Underline.Model.Guild
class Events {
    constructor() {
        this.name = "interactionCreate"
    }
    async execute(ctx) {
        let ArgoArray = ["am","anne", "aq", "a.q", "a.q.", "amk", "çük", "döl", "meme", "oç", "o.ç", "o.ç.", "oral", "penis", "piç", "pipi", "sik", "ambiti", "amcık", "amck", "amık", "amını", "amına", "amında", "amsalak", "dalyarak", "daşak", "daşağı", "daşşak", "daşşağı", "domal", "fahişe", "folloş", "fuck", "gavat", "godoş", "göt", "hasiktir", "hassiktir", "ibne", "ipne", "kahpe", "kahbe", "kaltak", "kaltağ", "kancık", "kancığ", "kavat", "kerane", "kerhane", "kevaşe", "mastırbasyon", "masturbasyon", "mastürbasyon", "orosbu", "orospu", "orusbu", "oruspu", "orsp", "pezevenk", "pzvnk", "puşt", "qavat", "sakso", "sıçar", "sıçayım", "sıçmak", "sıçsın", "sikem", "siker", "sikeyim", "sikici", "sikik", "sikim", "sikiş", "sikle", "sikme", "siktir", "sktr", "siktiği", "sokarım", "sokayım", "sürtük", "sperm", "taşak", "taşağa", "taşağı", "taşşak", "taşşağa", "taşşağı", "vajina", "yalaka", "yarağ", "yarra", "yrrk"]
        const GuildSettings = await Guild.findOne({ GuildID: ctx.guild.id })
        if (!GuildSettings) return;

        if (ctx.isButton()) {
          const ID = ctx.message.content.split(":")[1]
          let member = await ctx.guild.members.fetch(ID)
          if(!ctx.member.guild.roles.cache.find(r => r.id == GuildSettings.OwnerID) && !ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ctx.reply({
            content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`, 
          })
            const fields = {
                name: new TextInputBuilder()
                .setCustomId('user')
                .setLabel("Kullanıcı İsmi")
                .setPlaceholder("örnek: Thealoq")
                .setStyle(TextInputStyle.Short),
                Age: new TextInputBuilder()
                .setCustomId('age')
                .setLabel("Kullanıcı İsmi")
                .setPlaceholder("örnek: 20")
                .setStyle(TextInputStyle.Short),
              }
            if (ctx.customId === "kayıt") {
                const modal = new ModalBuilder()
                    .setCustomId('register')
                    .setTitle('Kayıt Formu');
                const secondActionRow = new ActionRowBuilder().addComponents(fields.name);
                const ActionRow = new ActionRowBuilder().addComponents(fields.Age);
                modal.addComponents(secondActionRow,ActionRow);
                await ctx.showModal(modal);
                const submitted = await ctx.awaitModalSubmit({
                    time: 60000,
                    filter: i => i.user.id === ctx.user.id,
                  }).catch(error => {
                    console.error(error)
                    return null
                  }).catch(e => false)
                  if (submitted) {
                    const [ name, Age ] = Object.keys(fields).map(key => submitted.fields.getTextInputValue(fields[key].data.custom_id))
                    if (ArgoArray.includes(name)) return submitted.reply({
                      content: `[\`🔴\`] Dostum İsmine [\`${name}\`] Küfür Ekliyemezsin`, 
                    })
                    member.setNickname(`${GuildSettings.Tag ? `${GuildSettings.Tag} ` : "✦ "} ${name.charAt(0).toUpperCase() + name .slice(1).toLowerCase()}${Age ? ` - ${Age}` : ``}`).catch(e => false)
                    member.roles.add(GuildSettings.MemberRole).catch(e => false)
                    let channel = await client.channels.cache.get(GuildSettings.GenelCh)
                    await channel.send({
                      content: `[\`🟢\`] Yeni Bir Arkadaşiniz Kayit Oldu ${member} Hoş Geldin`, fetchReply: true
                    })
                    await submitted.reply({
                      content: `[\`🟢\`] Tebrikler Başariyla Kayıt Oldun İsminde \`${GuildSettings.Tag ? `${GuildSettings.Tag}` : "✦"} ${name.charAt(0).toUpperCase() + name .slice(1).toLowerCase()}${Age ? ` - ${Age}` : ``}\`  Olarak Kayıt Ettim!`, fetchReply: true, ephemeral: true 
                    })
                  }
            }
        }
    
    }
}
module.exports = Events