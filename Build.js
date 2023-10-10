const chalk = require("chalk")
const { Collection,Routes, PermissionsBitField} = require("discord.js")
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const Status = chalk.hex('#0ed3e5')
const Danger = chalk.hex('#ea0c0c')
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
        console.log(chalk.green(`💚 [${index}][Command] Başarıyla ` + command.name + " komutu başarıyla yüklendi"));
      } else {
        console.log(`❌ ${commands} yüklenemedi`);
      }
    } else {
      readdirSync(path + commands + "/").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const command = require(`${path}` + commands + "/" + folder)
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
  const data = []
  client.slashCommands = new Collection();
  readdirSync(path).forEach((slashCommands, index) => {
  index = index+1
    if (slashCommands.endsWith(".js")) {
      const slashCommand = require(`${path}` + slashCommands)
      if (!slashCommand.data.name) return console.log(chalk.red("Slash command name required"))
      if (!slashCommand.data.description) return console.log(chalk.red("Slash command descriptions required"))
      client.slashCommands.set(slashCommand.data.name, slashCommand)
      console.log(chalk.yellow(`💛 [${index}][Slash] Başarıyla ${slashCommand.data.name} event başarıyla yüklendi`));
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
      readdirSync(path + slashCommands + "/").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const SlashCommand = require(`${path}` + slashCommands + "/" + folder)
          if(!SlashCommand.options?.public) return;
          client.slashCommands.set(SlashCommand.data.name, SlashCommand,SlashCommand.options)
          console.log(chalk.yellow(`💛 [${index}][Slash] Başarıyla ${SlashCommand.data.name} event başarıyla yüklendi`));
          data.push({
            name: SlashCommand.data.name,
            description: SlashCommand.data.description,
            options: SlashCommand.data.options ? SlashCommand.data.options : null,
            default_member_permissions: SlashCommand.default_member_permissions
                ? PermissionsBitField.resolve(
                    SlashCommand.default_member_permissions
                ).toString()
                : null,
          })
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
        console.log(Status(`🩵 [Event] Başarıyla` + event.name + " event başarıyla yüklendi"));
      } else {
        console.log(Danger(`☠️ ${file} yüklenemedi`));
      }
    } else {
      readdirSync(path + EventLoader + "/").forEach(folder => {
        if (path.endsWith(".js")) return
        else {
          const event = new (require(`${path}` + EventLoader + "/" + folder))()
          if (event.name) {
            client.on(event.name, event.execute)
            console.log(Status(`🩵 [Event] Başarıyla` + event.name + " event başarıyla yüklendi"));
          } else {
            console.log(Danger(`☠️ ${file} yüklenemedi`));
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