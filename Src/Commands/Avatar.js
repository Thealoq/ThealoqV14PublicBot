const config = global.config
const client = global.client
const fetch = require('node-fetch');
class Commands {
    constructor() {
        this.name = "avatar"
        this.description = "user avatar"
        this.options =
            [{
                type: 3,
                description: `user`,
                name: "id",
            }]
            this.on = true
    }
    async execute(ctx) {
        const veri = ctx.options._hoistedOptions[0] ? ctx.options._hoistedOptions[0].value : ctx.user.id
        const url = `https://discordapp.com/api/v8/users/${veri}`;
        const headers = {
            'Authorization': `Bot ${config.token}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        const json = await response.json();
        if(!json.avatar) return
        return ctx.reply(`https://cdn.discordapp.com/avatars/${veri}/${json.avatar}.${json.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`)
    }
}
module.exports = Commands
