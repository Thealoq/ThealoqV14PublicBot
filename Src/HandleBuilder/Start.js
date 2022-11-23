const fs = require('fs');
const path = require("path");
const mongoose = require("mongoose");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = global.config = require('../../Config.json');
const client = global.client = new Client({ intents: [32767] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
class Handler {
    async initCommands() {
        const ClientID = config.dev ? config.devId : config.ClientID
        const commands = global.commands = [];
        let commandsPath = path.join(__dirname, "../Commands")
        fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")).forEach(file => {
            let command = new (require(`../Commands/${file}`))(client)
            commands.push(command);
        });
        const rest = new REST({ version: '9' }).setToken(config.dev ? config.devtoken : config.token);
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationCommands(ClientID, config.GuildID),
                    { body: commands },
                );
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
    GetEvents() {
        let eventsPath = path.join(__dirname, "../Events")
        fs.readdirSync(eventsPath).filter(file => file.endsWith(".js")).forEach(file => {
            let event = new (require(`../Events/${file}`))()
            client.on(event.name, event.execute)
        });
    }
    Login(token) {
        client.login(token).then(e => console.log(`${client.user.username} Bağlandı`)).catch(e => console.error(e));
    }
    getClient() {
        return client;
    }
    async connectMongo(url) {
        mongoose.connect(url, {
            useNewUrlParser: true,
            autoIndex: true,
            connectTimeoutMS: 10000,
            family: 4
        }).then(console.log("Mongoya Bağlandı")).catch(e => console.error(e));
    }
    getMongo() {
        return mongoose
    }
    Start() {
        this.Login(config.dev ? config.devtoken : config.token);
        this.connectMongo(config.url);
        this.initCommands(client);
        this.GetEvents(client);
        return this;
    }
}

module.exports = new Handler()