
const { Client, GatewayIntentBits } = require("discord.js");
const guildRegisterSchema = require('./@shared/models/guildregister.schema');
const guildSchema = require('./@shared/models/guild.schema');
const chalk = require("chalk")
const Ghost = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]});
Ghost.login(global.config.token).then(e => console.log(chalk.yellow(`🟡 [${Ghost.user.username}] Bot Giriş Yapti`))).catch(e => console.error(e));
globalThis.Underline = {
    Ghost: Ghost,
    Model: {
        guildRegister: guildRegisterSchema,
        Guild: guildSchema,
    },
}
    