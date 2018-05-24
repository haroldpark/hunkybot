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
    let currentIndex = this.deck.length, temporaryValue, randomIndex;

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
