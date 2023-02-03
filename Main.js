const { BuildCommands, BuildSlash, EventLoader } = require("./Build")
const config = global.config = {
  "token": "MTAyODI1MjUyMTM2MzQyMzI5NA.GAEwoi.gMYs5QBpXIkIe6FI920LDzEiwFCgzeedMqnhtM",
  "token2":"MTA2OTIxMTk2Nzk5NjMwMTM2Mg.GqeBv3.oa-xLeJBUAhuPRoJb56ndyp_5V7t9CbBxjRT8k",
  "url": "mongodb+srv://thealoq:lBoCuPJSjNf4AXnX@cluster0.bmkjbyb.mongodb.net/?retryWrites=true&w=majority",
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
  BuildSlash(`${__dirname}/Src/Commands/`,  Underline.Ghost, global.config.token,  Underline.Ghost.user.id)
  EventLoader(`${__dirname}/Src/Events/`,  Underline.Ghost)
})