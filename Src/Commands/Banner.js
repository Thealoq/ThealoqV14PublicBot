const config = global.config
const fetch = require('node-fetch');
class Commands {
    constructor() {
        this.name = "banner"
        this.description = "banner avatar"
        this.options =
            [{
                type: 3,
                description: `user`,
                name: "id",
            }]
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
        if (json.banner) return ctx.reply(`https://cdn.discordapp.com/banners/${veri}/${json.banner}.${json.banner.startsWith("a_") ? "gif" : "png"}?size=2048`)
        else return ctx.reply("No banner")
    }
}
module.exports = Commands
