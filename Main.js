const { BuildCommands, BuildSlash, EventLoader } = require("./Build")
const config = require('./config');
let { Db } = require("./DataBase")
global.config = config;
Db(config)
config.dev = false
let token = global.config.dev ? global.config.token2 : global.config.token;
require("./underline.js")
Underline.Thealoq.on("ready", () => {
  Underline.Thealoq.user.setPresence({ activities: [{ name: config.footer},{ name: config.footer2}], status: 'online' });
  BuildSlash(`${__dirname}/Src/Commands/`,  Underline.Thealoq, token,  Underline.Thealoq.user.id)
  BuildCommands(`${__dirname}/Src/PrefixCommads/`,  Underline.Thealoq)
  EventLoader(`${__dirname}/Src/Events/`,  Underline.Thealoq)
})








