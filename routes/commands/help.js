module.exports = (msg, embed) => {
  embed.setTitle('Command list')
    .setColor('#00AE86')
    .setDescription('Here are the bot\'s commands! Use the format "$<command>.<category *only for certain commands*> <query>"')
    .addField('$ffxiv.<category> <query>', 'Only "items" category is available at the moment')
    .addField('$giphy <query>', 'Get a random giphy!')
    .addField('$soundboard <query>', 'Play a sound on your current voice channel. Available search queries: allahuakbar, babyatriple, ballsofsteel, boomheadshot, bruh, crickets, dramaticchipmunk, falconpunch, finishhim, hadouken, heylisten, iknowkungfu, metalgear, mlgairhorn, nooo, over9000, saywhatagain, silenceikillyou, sonicboom, sparta, trollolol, victoryff, wrongnumber, wtfboom, xfiles');
  return msg.channel.send({embed})
}
