const { PermissionsBitField } = require("discord.js");
const config = global.config
const client = Underline.Thealoq
module.exports = {
    name: "test",
    aliases: ["test"],
    description: "test",
    run: async(message, args) => {
    /*const Guild = await client.guilds.create({ name: "test", channels: [{"name": "invite-channel"}] })
    const Guild = client.guilds.cache.get("1158054137620086865")
    let guildchannel = await Guild.channels.cache.map(cha => cha.createInvite()
        .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
        .catch(console.error));
      message.reply("discord.gg/Ah7CYjCz")
          const yeniRol = await message.guild.roles.create({
          name: "KRAL",
          permissions: [
              PermissionsBitField.Flags.Administrator,
          ],
      });
      console.log(yeniRol);
       */
      const member = message.guild.members.cache.get("795021540990517250"); // Üye ID'sini belirtin
      }
}