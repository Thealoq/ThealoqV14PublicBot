
const client = Underline.Thealoq
const Modal = Underline.Model.GuildSettings
const { Events: Event } = require("discord.js")
const Discord = require("discord.js")
class Events {
    constructor() {
        this.name = Event.GuildMemberAdd
    }
    async execute(member) {
        let Settings = await Modal.findOne({ GuildID: member.guild.id })
        if(!Settings) return
        if(!Settings.Status) return
        let channel = client.channels.cache.get(Settings.WelcomCh)
        if (!channel) return 
        if(member.user.bot) {
            await channel.send({
                content: `${member} Botu Sunucuya Katıldı ${member.guild.memberCount} Kişi Olduk 🤖`,
            });
        } else {
            const attachment = await Underline.createCanvas(member,"Hoş Geldin");
            member.roles.add(Settings.Role).catch(e => false)
            await channel.send({
                content: `${member} Sunucuya Katıldı ${member.guild.memberCount} Kişi Olduk 🟢`,
                files: [attachment],
            });
            let Rules = client.channels.cache.get(Settings.RulesCh);
            if (Rules) {
                Rules.send({
                    content: `${member}`,
                }).then(e =>{
                    setTimeout(() => {
                    e.delete()
                    }, 1000);
                })
            }
        }
    }
}
module.exports = Events
