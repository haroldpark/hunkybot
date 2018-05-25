module.exports = (config) => {

const validCommands = ['help', 'giphy', 'recipes', 'ffxiv', 'soundboard'];

//method to iterate through your valid commands and fulfill that request
	  function fulfillRequest () {
          return require("./commands/" + command)(msg, embed);
  }

	//dependencies to get discord api started
  	const Discord = require('discord.js');
  	const bot = new Discord.Client();
  	const embed = new Discord.RichEmbed();

  	const prefix = config.prefix;

  	//models
 	const Request = require('../models/Request.js');
  	const Response = require('../models/Response.js');

//do something when bot receives a message in the server
  	bot.on('message', msg => {

    	if (msg.content == 'test') {
     		require("./test")();
    	}

    	//verifies that message starts with our prefix. prefix is $ by default
    	if (msg.content.startsWith(prefix)) {
//new message from discord = new request to pull up script from commands folder
      	let request = new Request(msg.content);
      	let command = request.command;
      	let category = request.category;
      	let query = request.query;

	//error handler. Checks for valid command
if (!request.validateCommand()) {
    return require("./commands/errorhandler")(msg, embed);
}

return fulfillRequest();
});
//instantiates bot with token
	bot.login(config.token);
}
