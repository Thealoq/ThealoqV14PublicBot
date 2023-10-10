
const client = Underline.Thealoq
const { Events: Event } = require("discord.js")
const Discord = require("discord.js")
const SecretVoice = Underline.Model.SecretVoice
class Events {
    constructor() {
        this.name = Event.VoiceStateUpdate;
    }

    async execute(oldState, newState) {
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const GuildSecret = await SecretVoice.findOne({
            GuildID: oldState.guildId,
            Member: oldState.member.id
        });

        if (oldChannel && !newChannel) {
            const channelMembers = oldChannel.members.size;
            if (channelMembers === 0) {
                try {
                    await oldChannel.delete();
                    console.log(`${oldChannel.name} kanalı otomatik olarak silindi.`);

                    if (GuildSecret && GuildSecret.Channel === oldChannel.id) {
                        await GuildSecret.remove();
                        console.log(`SecretVoice verisi silindi: ${GuildSecret}`);
                    }
                } catch (error) {
                    console.error(`Kanalı silerken hata oluştu: ${error}`);
                }
            }
        }
    }
}
module.exports = Events
