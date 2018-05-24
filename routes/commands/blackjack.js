module.exports = (bot, msg) => {
  let userTag = msg.member.user.username + msg.member.user.discriminator;
  let gameStarted = false;
  let blackjack = new Blackjack(userTag);

  msg.channel.sendMessage(userTag + ' has started a blackjack game! Type in "$blackjack join" to play');
    bot.on('message', sss => {
      if (sss == prefix + 'blackjack start') {
        blackjack.init();
        blackjack.deal();

        sss.channel.sendMessage('Blackjack has started! Here are your hands:');
        for (let i=0; i<blackjack.players.length; i++) {
          let prompt = blackjack.players[i].username + '\'s hand: '
          for (let j=0; j<blackjack.players[i].hand.length; j++) {
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
        for (let i=0; i<blackjack.players.length; i++) {
          if (blackjack.players[i].username == player) {
            blackjack.players[i].hit(blackjack.deck);
            total = blackjack.players[i].total;

            for (let j=0; j<blackjack.players[i].hand.length; j++) {
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
