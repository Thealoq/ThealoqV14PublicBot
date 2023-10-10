
const client = Underline.Thealoq
const { Events: Event ,WebhookClient, EmbedBuilder} = require("discord.js")
const Discord = require("discord.js")
const webhookURL = 'https://discord.com/api/webhooks/1154589785009164339/J1jaL4Tl-My4iCEuyk5-h-06jNEEEnJfAR9QptpZ71RndJ2H6UWRn6552jObwxNSolYH';
const webhookClient = new WebhookClient({ url: webhookURL });
class Events {
    constructor() {
        this.name = Event.MessageCreate
    }
    async execute(msg) {
        /*
        const genelSohbetKanalID = '1154588976401883207';
        const anonimSohbetKanalID = '1154588991350378507';
        if(msg.channel.id == genelSohbetKanalID ) {
            const anonimMesaj = msg.content;
            const anonimSohbetKanal = client.channels.cache.get(anonimSohbetKanalID);
            const embed = new EmbedBuilder()
            .setDescription(`Kullanıcı Anon213123: ${anonimMesaj}`)
            .setColor('#0099ff');
            webhookClient.send({
            username: 'Anonim Bot',
            avatarURL: "", 
            embeds: [embed], 
          });
        }
        */
    }
}
module.exports = Events
