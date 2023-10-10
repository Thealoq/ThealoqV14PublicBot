
const client = Underline.Thealoq
const Modal = Underline.Model.GuildSettings
const { Events:Event } = require("discord.js")
const Discord = require("discord.js")
class Events {
    constructor() {
        this.name = Event.GuildMemberRemove
    }
    async execute(member) {
        let Settings = await Modal.findOne({ GuildID: member.guild.id })
        if(!Settings) return
        if(!Settings.Status) return
        let channel = client.channels.cache.get(Settings.WelcomCh)
        if (!channel) return
        if(member.user.bot) {
            await channel.send({
                content: `${member} Botu Sunucudan Ayrıldı ${member.guild.memberCount} Kişi Kaldı 🤖`,
            });
        } else {
            const attachment = await Underline.createCanvas(member,"Görüşürüz");
            await channel.send({
                content: `${member} Sunucudan Ayrıldı, ${member.guild.memberCount} Kişi Kaldı 🔴`,
                files: [attachment],
            });
            }
        }
}
module.exports = Events
