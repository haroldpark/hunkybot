const request = require('request');
const Discord = require('discord.js');
const bot = new Discord.Client();

const http_request = require('request');
const helpers = require('./app/helpers/helpers.js');

//models
const Request = require('./models/Request.js');
const Response = require('./models/Response.js');

const config = require('./config.json');
const prefix = config.prefix;

const youtubeStream = require('youtube-audio-stream')

bot.on('message', msg => {
  //prefix is $
  if (msg.content == 'test') {
  }

  if (msg.content.startsWith(prefix)) {
    //Verifies that message starts with our prefix
    let request = new Request(msg.content);
    let command = request.command;
    let category = request.category;
    let query = request.query;

    if (!request.validateCommand()) {
      //Error handler for when a weird command is inputted
      const embed = new Discord.RichEmbed()
        .setTitle('Warning')
        .setColor('#B22222')
        .setDescription('You have entered an invalid command!')
      return msg.channel.send({embed})
    }

    if (command == 'help') {
      const embed = new Discord.RichEmbed()
        .setTitle('Command list')
        //.setAuthor('Author Name', 'https://i.imgur.com/lm8s41J.png')
        .setColor('#00AE86')
        .setDescription('Here are the bot\'s commands! Use the format "$<command>.<category *only for certain commands*> <query>"')
        .addField('$ffxiv.<category> <query>', 'Only "items" category is available at the moment')
        .addField('$giphy <query>', 'Get a random giphy!')
        .addField('$soundboard <query>', 'Play a sound on your current voice channel. Available search queries: allahuakbar, babyatriple, ballsofsteel, boomheadshot, bruh, crickets, dramaticchipmunk, falconpunch, finishhim, hadouken, heylisten, iknowkungfu, metalgear, mlgairhorn, nooo, over9000, saywhatagain, silenceikillyou, sonicboom, sparta, trollolol, victoryff, wrongnumber, wtfboom, xfiles');
      return msg.channel.send({embed})
    }

    if (command == 'soundboard') {
      const voiceChannel = msg.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join().then(connection => {
          //const stream = youtubeStream('https://www.youtube.com/watch?v=jUqYrdK-H6g')
          //const dispatcher = connection.playStream(stream)
          const dispatcher = connection.playFile('./app/lib/' + query + '.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
        }).catch(err => console.log(err));
      } else {
        //do this when user is not in a voice channel
        const embed = new Discord.RichEmbed()
          .setTitle('Warning')
          .setColor('#B22222')
          .setDescription('You are currently not in a voice channel!')
        return msg.channel.send({embed})
      }
    }

    if (command == 'shoppingcart') {
      let message = '';

      var recipeData = helpers.api.searchRecipes('scrambled+eggs', function (recipeData) {
        console.log (recipeData, 'RECIPEDATA');
        message += 'Your search returned ' + recipeData.total + ' responses';
      });

      //for (var i=0; i<recipeData.)
      //helpers.giveOptions()

    }






    if (command == 'ffxiv') {
      return require('./app/commands/ffxiv/item.js')(query, msg.channel);
  	}






  	if (msg.content.startsWith(prefix + 'giphy')) {

      let string = request.query;

      console.log('WHY HERE IS THE STRING', string)
      http_request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+ string, function (error, response, body) {
        if (error) {
          console.log('error:', error);
          return;
        }
        let url = JSON.parse(body).data.url;
        return msg.channel.sendMessage('Here is a random gif of: ' + string + '\n' + url);
      });
  	}

    if (msg.content.startsWith(prefix + 'blackjack play')) {
      let userTag = msg.member.user.username + msg.member.user.discriminator;
      let gameStarted = false;
      let blackjack = new Blackjack(userTag);


      msg.channel.sendMessage(userTag + ' has started a blackjack game! Type in "$blackjack join" to play');



        bot.on('message', sss => {
          if (sss == prefix + 'blackjack start') {
            blackjack.init();
            blackjack.deal();


            sss.channel.sendMessage('Blackjack has started! Here are your hands:');
            for (var i=0; i<blackjack.players.length; i++) {
              var prompt = blackjack.players[i].username + '\'s hand: '
              for (var j=0; j<blackjack.players[i].hand.length; j++) {
                prompt += blackjack.players[i].hand[j].value;
                prompt += ' of ';
                prompt += blackjack.players[i].hand[j].suit;
                prompt += ', ';
              }
              sss.channel.sendMessage(prompt);

            }

          }

          bot.on('message', eee => {
            if (eee == prefix + 'blackjack hit') {
              let player =  eee.member.user.username + eee.member.user.discriminator;
              let total;
              let prompt;

              console.log('HERE IS THE PLAYER WHO HIT', player);
              for (var i=0; i<blackjack.players.length; i++) {
                if (blackjack.players[i].username == player) {
                  blackjack.players[i].hit(blackjack.deck);
                  total = blackjack.players[i].total;


                  for (var j=0; j<blackjack.players[i].hand.length; j++) {
                    prompt += blackjack.players[i].hand[j].value;
                    prompt += 'of';
                    prompt += blackjack.players[i].hand[j].suit;
                    prompt += ', ';
                  }


                }
              }

              console.log('here is the players', blackjack.players)
              eee.channel.sendMessage(player + ' has hit. Your total is now: ' + total);
              eee.channel.sendMessage(prompt);
            }
          });
        });
      }


  }
});

bot.login(config.token);



// (function () {
//   let user = 'kek';
//   let blackjack = new Blackjack(user);
//
//   blackjack.init();
//   // msg.channel.sendMessage(user + ' has started a blackjack game! \n');
//
//
//   blackjack.deal();
//
//   for (var i=0; i<blackjack.players.length; i++) {
//     console.log('players', blackjack.players[i]);
//   }
//   blackjack.players[1].hit(blackjack.deck);
//   console.log('AFTGER HITTING', blackjack.players[1]);
//
//
//
// })();


console.log('Discord bot is running!');
