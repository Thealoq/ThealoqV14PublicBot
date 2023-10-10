const { codeBlock } = require("@discordjs/builders");
const { EmbedBuilder, Attachment, PermissionsBitField } = require("discord.js");
const config = global.config
const client = Underline.Thealoq
module.exports = {
    name: "sil",
    aliases: ["sil"],
    description: "sil",
    run: async(message, args) => {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && config.botOwner.includes(message.author.id)) return message.reply({
        content: `[\`🔴\`] Bu Komutu Kullanmaya Yetkiniz Yok`,
      })
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount <= 0) {
        return message.reply('Geçerli bir sayı belirtmelisiniz.');
      }
      message.channel.bulkDelete(amount)
        .then((deletedMessages) => {
          message.channel.send(`${deletedMessages.size} mesaj silindi.`);
        })
        .catch((error) => {
          console.error('Mesajları silerken bir hata oluştu:', error);
          message.reply('Mesajları silerken bir hata oluştu.');
        });
    }
}