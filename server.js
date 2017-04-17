const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const request = require('request');
const prefix = config.prefix;
const SUITS = [':spades:', ':clubs:', ':hearts:', ':diamonds:'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class Card {
  constructor (value, suit) {
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor () {
    this.deck = [];
  }

  makeDeck () {
    for (let i=0; i<SUITS.length; i++) {
      for (let j=0; j<VALUES.length; j++) {
        let card = new Card(VALUES[j], SUITS[i])
        this.deck.push(card);
      }
    }
  }

  shuffle () {
    var currentIndex = this.deck.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = temporaryValue;
    }
    return this.deck;
  }
}

class Blackjack extends Deck {
  constructor (firstplayer) {
    super();
    this.players = [new BlackjackPlayer('Dealer'), new BlackjackPlayer(firstplayer)];
  }
  addPlayer (username) {
    let newPlayer = new BlackjackPlayer(username);
    // newPlayer.hand.push(this.deck)
    // this.players.push(newPlayer);
    // this.players[i].hand.push(this.deck.shift());
    // this.players[i].hand.push(this.deck.shift());
  }

  init () {
    this.makeDeck();
    this.shuffle();
  }

  deal () {
    for (let i=0; i<this.players.length; i++) {
      this.players[i].hand.push(this.deck.shift());
      this.players[i].hand.push(this.deck.shift());
      this.players[i].calculateHand();
    }
  }

  makeDeck () {
    super.makeDeck();
  }

  shuffle () {
    super.shuffle();
  }
}

class Player {
  constructor (username) {
    this.username = username;
    this.hand = [];
  }
}

class BlackjackPlayer extends Player {
  constructor (tag) {
    super(tag);
    this.total;
  }
  hit (deck) {
    this.hand.push(deck.shift());
    this.calculateHand();
  }
  calculateHand () {
    let total = 0;
    for (let i=0; i<this.hand.length; i++) {
      if (this.hand[i].value == 'J' || this.hand[i].value == 'Q' || this.hand[i].value == 'K' || this.hand[i].value == 'A') {
        total += 10;
      } else {
        total += parseInt(this.hand[i].value);
      }
    }
    this.total = total;
  }
}




bot.login(config.token);

bot.on('message', msg => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }

	if (msg.content.startsWith(prefix + 'giphy')) {
    let arguments = msg.content.split(' ').slice(1);
    let query = arguments.join(' ');

    request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+ query, function (error, response, body) {
      if (error) {
        console.log('error:', error);
        return;
      }
      let gif = JSON.parse(body).data.url;
      msg.channel.sendMessage('Here is a random gif of: ' + query + '\n' + gif);
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



    // msg.channel.sendMessage();
    // (function () {
    //   setTimeout(function() {
    //     console.log('hihihihihi');
    //
    //   }, 15000);
    // })();

	}
});

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


console.log('discord bot is running!');
