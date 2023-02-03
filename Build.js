const chalk = require("chalk")
const { Collection,Routes } = require("discord.js")
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
function BuildCommands(path, client) {
  client.commands = new Collection();
  client.aliases = new Collection();
  readdirSync(path).forEach((commands, index, name) => {
    index = index+1
    if (commands.endsWith(".js")) {
      const command = require(`${path}` + commands)
      if (command.name) {
        client.commands.set(command.name, command)
        command.aliases.forEach(aliases => {
          client.aliases.set(aliases, command)
        });
        console.log(chalk.green(`🟢 [${index}][Command] Başarıyla ` + command.name + " komutu başarıyla yüklendi"));
      } else {
        console.log(`❌ ${commands} yüklenemedi`);
      }
    } else {
      readdirSync(path + commands + "\\").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const command = require(`${path}` + commands + "\\" + folder)
          if (command.name) {
            client.commands.set(command.name, command)
            command.aliases.forEach(aliases => {
              client.aliases.set(aliases, command)
            });
            console.log(chalk.green(`🟢 [${index}][Command] Başarıyla ` + command.name + " komutu başarıyla yüklendi"));
          } else {
            console.log(`❌ ${folder} yüklenemedi`);
          }
        }
      })
    }
  })
}
function BuildSlash(path, client, token, id, name) {
  data = new Array
  client.slashCommands = new Collection();
  readdirSync(path).forEach((slashCommands, index) => {
  index = index+1
    if (slashCommands.endsWith(".js")) {
      const slashCommand = require(`${path}` + slashCommands)
      if (!slashCommand.data.name) return console.log(chalk.red("Slash command name required"))
      if (!slashCommand.data.description) return console.log(chalk.red("Slash command descriptions required"))
      client.slashCommands.set(slashCommand.data.name, slashCommand)
      console.log(chalk.yellow(`🟡 [${index}][Slash] Başarıyla ${slashCommand.data.name} event başarıyla yüklendi`));
      data.push({
        name: slashCommand.data.name,
        description: slashCommand.data.description,
        options: slashCommand.data.options ? slashCommand.data.options : null,
        default_member_permissions: slashCommand.default_member_permissions
          ? PermissionsBitField.resolve(
            slashCommand.default_member_permissions
          ).toString()
          : null,
      })
    } else {
      readdirSync(path + commands + "\\").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const SlashCommand = require(`${path}` + slashCommands + "\\" + folder)
          if(!SlashCommand) return
        }
      })
    }
  })
  const rest = new REST({ version: "10" }).setToken(token);
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(id), {
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  })();
}

const EventLoader = function (path, client) {
  readdirSync(path).forEach((EventLoader, index) => {
    if(EventLoader.endsWith(".js")) {
      const event = new (require(`${path}` + EventLoader))()
      if (event.name) {
        client.on(event.name, event.execute)
        console.log(chalk.magenta(`🟣 [Event] Başarıyla ` + event.name + " event başarıyla yüklendi"));
      } else {
        console.log(chalk.red(`🔴 ${file} yüklenemedi`));
      }
    } else {
      readdirSync(path + EventLoader + "\\").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const event = new (require(`${path}` + EventLoader + "\\" + folder))()
          if (event.name) {
            client.on(event.name, event.execute)
            console.log(chalk.magenta(`🟣 [Event] Başarıyla ` + event.name + " event başarıyla yüklendi"));
          } else {
            console.log(chalk.red(`🔴 ${file} yüklenemedi`));
          }
        }
      })
    }
  })
}







module.exports = {
  BuildCommands,
  BuildSlash,
  EventLoader
};