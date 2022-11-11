const config = global.config;
const client = global.client;
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const UserModal = require("../schema/User");
class Commands {
  constructor() {
    this.name = "market";
    this.description = "market";
  }
  async execute(ctx) {
    let embed = new MessageEmbed()
      .setAuthor({
        name: ctx.guild.name,
        iconURL: ctx.guild.iconURL({ dynamic: true }),
      })
      .setFooter({
        text: config.footer.toString(),
        iconURL: ctx.user.avatarURL({ dynamic: true }),
      });
    const User = await UserModal.findOne({
      Member: ctx.user.id,
    });
    const Bahis = ctx.options._hoistedOptions[0]
      ? ctx.options._hoistedOptions[0].value
      : 1;
    const Daily = Math.floor(Math.random() * 300);
    if (!User) {
      new UserModal({
        Member: ctx.user.id,
        Coin: Daily,
        Status: true,
        Pets: [],
      }).save();
      ctx.reply({
        embeds: [
          embed.setDescription(
            `Seni Burda İlk Defa Görüyorum Aramıza Hoş Geldin <@${ctx.user.id}>  🎂 \n Ayrica Sana Başlarken ${Daily} Miktar Para Verdim`
          ),
        ],
      });
    }
    if (User && User.Coin < Bahis)
      return ctx.reply({
        embeds: [
          embed
            .setDescription(
              `<@${ctx.user.id}> Dostum hile Yapma Paran Yetmiyor `
            )
            .setColor("RED"),
        ],
      });

    function Emoji(e) {
      return client.emojis.cache.find((emojis) => emojis.name === e);
    }

    const ShopArray = new Array();
    const Pets = require("../schema/Pets");
    const AllPet = await Pets.findOne({});

    ShopArray.push(
      {
        Pet: Emoji("dogpet"),
        Value: "dogpet",
        Name: "Zeus",
        Price: 2000,
      },
      {
        Pet: Emoji("penguen"),
        Value: "penguen",
        Name: "Veronica",
        Price: 1000 * 10,
      },
      {
        Pet: Emoji("turtle"),
        Value: "turtle",
        Name: "Flash",
        Price: 1000 * 100,
      }
    );
    const PetShop = `${ShopArray.map(
      (item) => `Pet: [${item.Pet}]  \`${item.Name}\` (${item.Price})`
    ).join("\n")}`;

    ctx.reply({
      embeds: [
        embed
          .setDescription(
            `${PetShop} \n Satin almak istediğiniz O Buttona Tıklayin`
          )
          .setColor("RANDOM"),
      ],
      components: [
        new MessageActionRow().addComponents(
          ShopArray.map((emoji, index) =>  new MessageButton()
              .setCustomId(`${emoji.Value}`)
              .setEmoji(`${Emoji(emoji.Value)}`)
              .setStyle("SUCCESS")
          )
        ),
      ],
    });

    const filter = (i) => i.user.id === ctx.member.id;
    const collector = ctx.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });
    collector.on("collect", async (b) => {
      if (b.isButton()) {
        let item = ShopArray.find((e) => e.Value === b.customId);
        {
          if (b.customId === item.Value) {
            if (User && User.Coin < item.Price) {
              return ctx.editReply({
                embed: {
                  description: `<@${ctx.user.id}> Paran Yetmiyor ${Emoji(
                    "sad"
                  )}`,
                  color: "RED",
                },
              });
            }
            let Pets = User.Pets.find((e) => e.Name === item.Name);
            if (Pets) {
              return ctx.editReply({
                embeds: [
                  embed
                    .setDescription(`${item.Pet} Zaten Sahipsin`)
                    .setColor("RANDOM"),
                ],
                components: [],
              });
            }

            await ctx.editReply({
              embeds: [
                embed
                  .setDescription(
                    `${item.Pet} Tebrike Artik Bir ${item.Name} Sahipsiniz`
                  )
                  .setColor("RANDOM"),
              ],
              components: [],
            });
            await UserModal.updateOne(
              { Member: ctx.member.id },
              {
                $push: { Pets: { Name: item.Name, Value: item.Value } },
                $set: { Coin: User.Coin - item.Price },
              },
              { upsert: true }
            ).catch((e) => {
              console.error("hata var");
            });
          }
        }
      }
      collector.stop();
    });
  }
}
module.exports = Commands;
