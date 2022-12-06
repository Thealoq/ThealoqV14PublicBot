const config = global.config
const client = global.client
const { codeBlock } = require("@discordjs/builders");
class Events {
  constructor() {
    this.name = "messageCreate"
  }
  async execute(message) {
    const prefix = "!"
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    if (config.botOwner.includes(message.author.id)) {
      let args = message.content.split(' ').slice(1);
      let command = message.content.split(' ')[0].slice(prefix.length);
      if (command === "eval") {
        if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
        let code = args.join(' ');
        
        function clean(text) {
          if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
          text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
        };
  
        try {
          var evaled = clean(await eval(code));
          if (evaled.match(new RegExp(`${client.token}`, 'g')))
           evaled.replace(client.token, "Yasaklı komut");
  
          if (evaled.match(new RegExp("token", 'g'))) return message.channel.send("yask amk")
  
          message.channel.send(codeBlock("js",`${evaled.replace(client.token, "Yasaklı komut")}`)).catch(e => { console.error("hata var") })
       
        } catch (err) { message.channel.send(codeBlock("js",err)).catch(e => { console.error(e) }) };
      };
    };

  }
}
module.exports = Events

