const config = global.config;
const client = global.client;
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const SecretDb = require("../schema/Secret");
const GuildSettings = require("../schema/NewGuildSettings")
class Commands {
  constructor() {
    this.name = "secret";
    this.description = "secret";
    this.options = [];
  }
  async execute(ctx) {
    const Settings = await GuildSettings.find({ GuildId: ctx.guild.id, Set: { $elemMatch: { type: "userVoice" } } })
    const GuildSetting = Settings[0]
     if(!Settings[0]) return ctx.reply("Dostum Daha Katagoriyi ayarlamadin ayarlamak için \`\katagori\`")
  const Secret = await SecretDb.findOne({ GuildID: ctx.guild.id, Member: ctx.member.id  })
    async function RoomCreate (limit, id) {
      await ctx.guild.channels.create(`🔈${ctx.member.user.username} Odasi`, {
          type: "GUILD_VOICE",
          parent: GuildSetting.Set[0].channel,
          userLimit: limit,
          permissionOverwrites: [
              {
                  id: ctx.member.id,
                  allow: ['VIEW_CHANNEL']
              },
          ],
      }).then(async msg => {
        new SecretDb({
          GuildID: ctx.guild.id,
          Member: ctx.member.id,
          ChannelID: msg.id
      }).save()
          ctx.editReply({ embeds: [embed.setDescription("Başariyla Odaniz Oluştu!")
          .setColor("RANDOM")],
        components: [] })
      });
  } 
    let embed = new MessageEmbed()
      .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL({ dynamic: true }) })
      .setFooter({ text: config.footer.toString(), iconURL: ctx.user.avatarURL({ dynamic: true }) })
      .setColor("RANDOM")
      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('rooms')
          .setPlaceholder('Oda Özellikleriden Birini Seçebilirsiniz')
          .addOptions([
            {
              emoji: "🔉",
              label: 'Oda Oluştur',
              description: 'Sizin İçin Oda Oluşturur',
              value: 'create',
            },
            {
              emoji: "🖋️",
              label: 'isim değiştir',
              description: 'sahip olduğunuz odayinin ismini değiştir',
              value: 'name',
            },
            {
              emoji: "👻",
              label: 'Oda Sayısı',
              description: 'sahip olduğunuz odayinin kişi sayısını değiştir',
              value: 'members',
            },
            {
              emoji: "🔒",
              label: 'Odanizi kitle',
              description: 'sahip olduğunuz odayi kitler ',
              value: 'lock',
            },
            {
              emoji: "🔓",
              label: 'Odanizi aç',
              description: 'sahip olduğunuz odayi açar ',
              value: 'unlock',
            },
            {
              emoji: "❌",
              label: 'Odanizi sil',
              description: 'sahip olduğunuz odayi siler ',
              value: 'delete',
            },
          ]),
      );
    ctx.reply({
      embeds: [embed.setDescription("Aşağıda ki butona tıklayarak özel odanızı oluşturabilirsiniz Oluşturmanın ardından tekrardan aşağıda ki menüden odanızı yönetebilirsiniz")
        .setColor("RANDOM")],
      components: [row]
    });

    const filter = i => i.user.id === ctx.member.id;
    const collector = ctx.channel.createMessageComponentCollector({ filter, time: 60000 });
    const obj = {
      create: CreateRoom,
      name: ChangeName,
      members: ChangeVoiceLimit,
      lock:LockVoiceChannel,
      unlock: UnLockVoiceChannel,
      delete: DeleteVoiceChannel,
    }
    collector.on('collect', async b => {
        if (b.isSelectMenu()) {
            const func = obj[b.values];
            if (typeof func === "function") func(ctx, embed, RoomCreate,Secret);
          }
        })
  }
}
module.exports = Commands;
async function CreateRoom ( ctx , embed,RoomCreate, Secret) {
  if(Secret) return ctx.editReply({ embeds: [embed.setDescription("dostum zaten bir kanal sahipsin")] })
  RoomCreate(4,config.VoiceID)
}

async function ChangeName ( ctx, embed , RoomCreate, Secret) {
  if(!Secret) return ctx.editReply({ embeds: [embed.setDescription("Dostum bi kanala sahip değilsin")] })
  ctx.editReply({ embeds: [embed.setDescription("Lütfen Bir İsim Belirleyin")], components: [ ] })
const collector = ctx.channel.createMessageCollector({ time: 15000, limit: 1 });
  collector.on('collect', m => {
	client.channels.fetch(Secret.ChannelID)
  .then(channel => channel.setName(`${m}`))
  .catch(console.error);
ctx.editReply({ embeds: [embed.setDescription(`Başariyla Kanalın <#${Secret.ChannelID}> \`${m}\`  ismi Ayarlandi`)] })
});
}

async function ChangeVoiceLimit ( ctx, embed , RoomCreate, Secret) {
  if(!Secret) return ctx.channel.send({ embeds: [embed.setDescription("Dostum bi kanala sahip değilsin")] })
  ctx.editReply({  embeds: [embed.setDescription("Lütfen limit için bir sayi yazin")] })
  const collector = ctx.channel.createMessageCollector({ time: 15000, limit: 1 });
  collector.on('collect', m => {
	client.channels.fetch(Secret.ChannelID)
  .then(channel => channel.setUserLimit(parseInt(m.content)))
  .catch(console.error);
ctx.editReply({ embeds: [embed.setDescription(`Başariyla Kanalın <#${Secret.ChannelID}> Limit Sayısı \`${m}\` Olarak Ayarlandi`)] })
});
}

async function LockVoiceChannel ( ctx, embed , RoomCreate, Secret,  ) {
  if(!Secret) return ctx.editReply({ embeds: [embed.setDescription("Dostum bi kanala sahip değilsin")] })
  client.channels.fetch(Secret.ChannelID)
  .then(channel => channel.permissionOverwrites.edit(ctx.guild.roles.everyone.id, {
    CONNECT: false,
  }))
  .catch(console.error);
  ctx.editReply({ embeds: [embed.setDescription(`Başariyla Kanalın <#${Secret.ChannelID}> Başariyla 🔒 Kilitlendi`)] })
}

async function UnLockVoiceChannel ( ctx, embed , RoomCreate, Secret,  ) {
  if(!Secret) return ctx.editReply({ embeds: [embed.setDescription("Dostum bi kanala sahip değilsin")] })
  client.channels.fetch(Secret.ChannelID)
  .then(channel => channel.permissionOverwrites.edit(ctx.guild.roles.everyone.id, {
    CONNECT: true,
  }))
  .catch(console.error);
  ctx.editReply({ embeds: [embed.setDescription(`Başariyla Kanalın <#${Secret.ChannelID}> Başariyla 🔓 Açıldı`)] })
}


async function DeleteVoiceChannel ( ctx, embed , RoomCreate, Secret,  ) {
  if(!Secret) return ctx.editReply({ embeds: [embed.setDescription("Dostum bi kanala sahip değilsin")] })
  client.channels.fetch(Secret.ChannelID)
  .then(channel => channel.delete())
  .catch(console.error);
  SecretDb.findOneAndRemove({ GuildID: ctx.guild.id, Member: ctx.member.id }).catch(e => { console.error({}) })
  ctx.editReply({ embeds: [embed.setDescription(`Başariyla Kanalın Silindi`)] })
}