const config = global.config
const client = global.client
const MessageData = require("../schema/MessageData")
const MessageChannel = require("../schema/MessageChannel")
const GuildSettings = require("../schema/NewGuildSettings")
class Events {
    constructor() {
        this.name = "messageCreate"
    }
    async execute(message) {
        console.log(message.content);
        let Veri = await MessageData.findOne({ GuildId: message.guild.id, MemberId: message.member.id })
        let Channel = await MessageChannel.findOne({ GuildId: message.guild.id, Channel: message.channel.id, MemberId: message.member.id })
        if(message.author.bot) return
        if (!Veri) {
            Veri = new MessageData({
                GuildId: message.guild.id,
                MemberId: message.member.id,
                Point: 1,
            })
            Veri.save()
        } else {
            const Settings = await GuildSettings.find({ GuildId: message.guild.id, Set: { $elemMatch: { type: "message" } } })
            const Sayi = Settings[0]
            if(Veri.Point >= Sayi ? Sayi.Set[0].level: 0 ) {
             message.member.roles.add(Settings[0].Set[0].role)
            } 
            Veri.Point += 1
            Veri.save()
        }
        if (!Channel) {
            Channel = new MessageChannel({
                GuildId: message.guild.id,
                MemberId : message.member.id,
                Channel: message.channel.id,
                Point: 1
            })
            Channel.save()
        } else {
            Channel.Point += 1
            Channel.save()
        }
      
    }
}
module.exports = Events