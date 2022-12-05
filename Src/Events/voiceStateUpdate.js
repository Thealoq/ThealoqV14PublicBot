const config = global.config
const client = global.client
const MemberData = require('../schema/UserLenght');
const GuildSettings = require('../schema/NewGuildSettings');
const Channel = require('../schema/Channel');
const { Collection } = require("discord.js");
let DataBase = new Collection()
class Events {
    constructor() {
        this.name = "voiceStateUpdate"
    }
    async execute(oldState, newState) {
        if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
        if ((!oldState?.channelId) && (newState?.channelId)) {
            DataBase.set(oldState.member.id, Date.now())
        } else if ((oldState && oldState.channelId) && (newState && !newState.channelId)) {
            let UserData = await MemberData.findOne({ GuildId: oldState.guild.id, MemberId: oldState.member.id })
            let ChannelData = await Channel.findOne({ GuildId: oldState.guild.id, MemberId: oldState.member.id, Channel: oldState.channelId, parentID: oldState.channel.parentId })
            if(UserData == null) {
                let newData = await new MemberData({
                    GuildId: oldState.guild.id,
                    MemberId: oldState.member.id,
                    VoiceTime: Date.now() - DataBase.get(oldState.member.id),
                })
                newData.save().catch(err => console.log(err));
            } else {
                const Settings = await GuildSettings.find({ GuildId: oldState.guild.id, Set: { $elemMatch: { type: "voice" } } })
                const Sayi = Settings[0]
               if(Cover(UserData.VoiceTime) >= Settings[0] ? Settings[0].Set[0].level : null) {
                Settings[0] ?  oldState.member.roles.add(Settings[0].Set[0].role) : false
               
               } 
                const data = Date.now() - DataBase.get(oldState.member.id)
                UserData.VoiceTime = data + UserData.VoiceTime
                UserData.save().catch(err => console.log(err));
            }
            if(ChannelData == null) {
                let newData = await new Channel({
                    GuildId: oldState.guild.id,
                    MemberId: oldState.member.id,
                    Channel: oldState.channelId,
                    VoiceTime: Date.now() - DataBase.get(oldState.member.id),
                    parentID: oldState.channel.parentId
                })
                newData.save().catch(err => console.log(err));
            } else {
                const datas = Date.now() - DataBase.get(oldState.member.id)
                ChannelData.VoiceTime = datas + ChannelData.VoiceTime
                ChannelData.save().catch(err => console.log(err));
            }
                DataBase.delete(oldState.member.id)
            }
    }
}
module.exports = Events

function Cover(millis) {
    var minutes = Math.floor(millis / 60000);
    return minutes;
  }