const config = global.config
const client = global.client
const UserModal = require("../schema/User")
const Time = new Date()
class Events {
    constructor() {
        this.name = "ready"
    }
    async execute() {
        setInterval(async function () {
            const UserArray = []
            client.guilds.cache.map(guild => client.guilds.cache.get(guild.id).members.cache.map( item => UserArray.push(item) ))
            if (Time.getHours() == 12) {
                UserArray.filter(t => !t.user.bot ).map( async User => {
                    let UserData = await UserModal.findOne({
                        Member: User.user.id,
                    });
                    if (UserData) {
                        return await UserModal.findOneAndUpdate({ Member: User.user.id, Status: true })
                    }
                })

            }
        }, 10000 * 60);
        client.user.setPresence({ activities: [{ name: `${config.footer} ${client.guilds.cache.size} Sunucuya Hizmet Veriyor` }] });
    }
}
module.exports = Events