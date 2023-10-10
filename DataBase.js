const express = require('express');
const mongoose = require('mongoose');
const chalk = require("chalk")
const app = express();
const port = 3000;
const DbStatus = chalk.hex('#1d7fbe')
app.get('/', (req, res) => {
    res.send('Merhaba, Dünya!');
  });
  app.listen(port, () => {});
  const Db = function (config) {
    mongoose.set('strictQuery', true).connect(config.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(e => console.log(DbStatus("💙 [DataBase] Database Bağlandı")))
  }
  module.exports = {
    Db
  }

