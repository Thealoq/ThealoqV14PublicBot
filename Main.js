global.config = require("./config.json")
const mongoose = require('mongoose');
const chalk = require("chalk")
require("./underline.js")
const { BuildCommands, BuildSlash, EventLoader } = require("./Build")
mongoose.set('strictQuery', true).connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(e => console.log(chalk.magenta("🟣 [Event] Database Bağlandı")))
Underline.Ghost.on("ready", () => {
  BuildSlash(`${__dirname}\\Src\\Commands\\`,  Underline.Ghost, global.config.token,  Underline.Ghost.user.id)
  EventLoader(`${__dirname}\\Src\\Events\\`,  Underline.Ghost)
})