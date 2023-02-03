const { BuildCommands, BuildSlash, EventLoader } = require("./Build")
const config = global.config = {
  "token": "MTAyODI1MjUyMTM2MzQyMzI5NA.GAEwoi.gMYs5QBpXIkIe6FI920LDzEiwFCgzeedMqnhtM",
  "url": "mongodb://localhost:27017/thealoq",
  "prefix": ".",
  "footer":"Ghost 💛 Thealoq"
}
const mongoose = require('mongoose');
const chalk = require("chalk")
require("./underline.js")
mongoose.set('strictQuery', true).connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(e => console.log(chalk.magenta("🟣 [Event] Database Bağlandı")))
Underline.Ghost.on("ready", () => {
  BuildSlash(`${__dirname}/Src/Commands//`,  Underline.Ghost, global.config.token,  Underline.Ghost.user.id)
  EventLoader(`${__dirname}/Src/Events//`,  Underline.Ghost)
})