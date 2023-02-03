const config = global.config
const client = Underline.Ghost
class Events {
    constructor() {
        this.name = "ready"
    }
    async execute() {
        client.user.setPresence({ activities: [{ name: config.footer }] });
    }
}
module.exports = Events