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
        let Veri = await MessageData.findOne({ GuildId: message.guild.id, MemberId: message.member.id })
        let Channel = await MessageChannel.findOne({ GuildId: message.guild.id, Channel: message.channel.id, MemberId: message.member.id })
        if (!Veri) {
            Veri = new MessageData({
                GuildId: message.guild.id,
                MemberId: message.member.id,
                Point: 1,
            })
            Veri.save()
        } else {
            const Settings = await GuildSettings.find({ GuildId: message.guild.id, Set: { $elemMatch: { type: "message" } } })
            if(Settings[0].Set[0].level) return
            if(Veri.Point >= Settings[0].Set[0].level ) {
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