module.exports = (config) => {
  const Discord = require('discord.js');
  const bot = new Discord.Client();
  const embed = new Discord.RichEmbed();

  const prefix = config.prefix;

  //models
  const Request = require('../models/Request.js');
  const Response = require('../models/Response.js');

  bot.on('message', msg => {
    //prefix is $ by default
    if (msg.content == 'test') {
      require("./test")();
    }

    //this if statement verifies that message starts with our prefix
    if (msg.content.startsWith(prefix)) {
      let request = new Request(msg.content);
      let command = request.command;
      let category = request.category;
      let query = request.query;

      if (!request.validateCommand()) {
        return require("./commands/errorhandler")(msg, embed);
      }

      if (command == 'help') {
        return require("./commands/help")(msg, embed);
      }

      if (command == 'soundboard') {
        return require("./commands/soundboard")(msg, embed);
      }

      if (command == 'shoppingcart') {
        return require("./commands/shoppingcart")(msg, embed);
      }

      if (command == 'ffxiv') {
        return require('./commands/ffxiv/item.js')(query, msg.channel);
      }

      if (command == 'giphy') {
        return require("./commands/giphy")(msg, request);
      }

      if (command == 'blackjack play') {
        return require("./commands/blackjack")(bot, msg);
      }
    }
  });

  bot.login(config.token);
}
