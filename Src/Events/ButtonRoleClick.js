
const client = Underline.Thealoq
const { Events: Event, EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const RoleGuild = Underline.Model.ButtonRoleGuild
class Events {
    constructor() {
        this.name = Event.InteractionCreate
    }
    async execute(ctx) {
        if(ctx.isButton() && !ctx.user.bot) {
            const GuildSettings = await RoleGuild.findOne({ GuildID: ctx.guild.id }).catch((error) => {
                console.error(`hata oluştu: ${error}`);
            });
            if (!GuildSettings) {
                return;
            }
            GuildSettings.ButtonRole.map((item, index) => {
                if (ctx.customId == "role" + index) {
                    const member = ctx.guild.members.cache.get(ctx.user.id);
                    if(!member){return}
                    if (member.roles.cache.has(item.Role)) {
                        ctx.reply({ content: `[🫡] Başariyla Rol <@&${item.Role}> Alindi.`, ephemeral: true})
                        member.roles.remove(item.Role)
                    } else {
                        member.roles.add(item.Role)
                            .then(() => {
                                ctx.reply({ content: `[🫡] Başariyla <@&${item.Role}> Rol Verildi.`, ephemeral: true})
                            })
                            .catch((error) => {
                                console.error(`Rol eklenirken bir hata oluştu: ${error}`);
                            });
                    }
                }
            })
        }
    }
}
module.exports = Events
