const config = global.config
const client = global.client
class Events {
    constructor() {
        this.name = "messageCreate"
    }
    async execute(message) {
        const clean = async (text) => {
            if (text && text.constructor.name == "Promise")
              text = await text;
            if (typeof text !== "string")
              text = require("util").inspect(text, { depth: 1 });
            text = text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
            }
  const args = message.content.split(" ").slice(1);
  if (message.content.startsWith(`!eval`)) {
    if (message.author.id !== "1000776223795970108")
      return;
    try {
      const evaled = eval(args.join(" "));
      const cleaned = await clean(evaled);
      message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``).catch(e => { console.error(e) })
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${args.join(" ")}\n\`\`\``);
    }
  }
    }
}
module.exports = Events

