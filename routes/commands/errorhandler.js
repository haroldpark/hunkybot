module.exports = (msg, embed) {
  //testing stuff
  //Error handler for when a weird command is inputted
  embed.setTitle('Warning')
    .setColor('#B22222')
    .setDescription('You have entered an invalid command!')
  return msg.channel.send({embed})
}
