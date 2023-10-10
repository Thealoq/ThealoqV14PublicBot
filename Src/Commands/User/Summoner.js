const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
//const Guild = Underline.Model.Guild
const client = Underline.Thealoq
module.exports = {
    options : {
        developer: false,
        public: true,
        inactive :false,
    },
    data: new SlashCommandBuilder()
        .setName("summoner")
        .setDescription("Lol Hesabinizi Durumunu Gösterir")
        .addStringOption((option) => option.setRequired(true).setName('summoner').setDescription('set a name').setMaxLength(16))
        .addStringOption((option) => option.setRequired(false).setName('server').setDescription('select server')
            .addChoices(
                { name: 'Russia', value: 'ru' },
                { name: 'Oceania', value: 'oce' },
                { name: 'Turkey', value: 'tr' },
                { name: 'Brazil', value: 'br' },
                { name: 'North America', value: 'na' },
                { name: 'Europe West', value: 'euw' },
                { name: 'Korea', value: 'kr' },
                { name: 'Japon', value: 'jp' },
            )),
    run: async (ctx) => {
        const name = await ctx.options._hoistedOptions.filter(t => t.name == "summoner")
        const server = await ctx.options._hoistedOptions.filter(t => t.name == "server")
        fetch(`https://api.senpai.gg/api/v1/lol/profile/${server[0] ? server[0].value : "euw"}/${name[0].value}`)
            .then(response => response.json())
            .then(api => {
                if (!api.name) {
                    ctx.reply("not Found User")
                } 
                else {
                    ctx.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setImage(api.championHighlights[0] ? api.championHighlights[0].image : "https://www.leagueoflegends.com/static/tank-3a77f5867947ebdaf03b490b35cb6782.jpg")
                            .setFields(
                                {
                                    name: "Rank",
                                    value: `${api.rank ? api.rank.tier : "NotFound Rank"} ${api.rank ? api.rank.division : " "}`,
                                    inline: true
                                },
                                {
                                    name: "Win/Lose",
                                    value: `${api.rank ? api.rank.wins : "0"}/${api.rank ? api.rank.losses : "0"}`,
                                    inline: true
                                },
                                {
                                    name: "Summoner",
                                    value: api.name,
                                    inline: true
                                },
                                {
                                    name: "Tags",
                                    value: api.tags[0]? api.tags[0].key : "You Do Not Have A Tag",
                                    inline: true
                                },
                                {
                                    name: "Summers You Play With Elegant",
                                    value: `${api.mostPlayedWith[0] ? `${api.mostPlayedWith[0].name}/` : "Not Found Dude"}${api.mostPlayedWith[0] ? api.mostPlayedWith[0].totalGames : " "}`,
                                    inline: false
                                }
                            )]
                    })
                }

            })
            .catch(err => console.error(err));
    }
};