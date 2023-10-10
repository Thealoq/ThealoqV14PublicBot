const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const config = global.config;
const client = Underline.Thealoq;

module.exports = {
  name: "yasaklist",
  aliases: ["yasaklist"],
  description: "yasaklist",
  run: async (message, args) => {
     if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))  
      return message.reply({
        content: "Bu Komutu Kullanmaya Yetkiniz Yok",
      });

   
  const bans = await message.guild.bans.fetch();
    bans.forEach(async (ban) => {
      const user = ban.user;
      await message.guild.members.unban(user);
     console.log(`\`${user.tag}\` üyesinin banı kaldırıldı.`);
    });
  },
};
