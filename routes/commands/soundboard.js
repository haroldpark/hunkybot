module.exports = function (msg, embed) {
  const voiceChannel = msg.member.voiceChannel;
  if (voiceChannel) {
    voiceChannel.join().then(connection => {
      //const stream = youtubeStream('https://www.youtube.com/watch?v=jUqYrdK-H6g')
      //const dispatcher = connection.playStream(stream)
      const dispatcher = connection.playFile('../app/lib/' + query + '.mp3');
      dispatcher.on("end", end => {
        voiceChannel.leave();
      });
    }).catch(err => console.log(err));
  } else {
    //do this when user is not in a voice channel
    embed.setTitle('Warning')
      .setColor('#B22222')
      .setDescription('You are currently not in a voice channel!')
    return msg.channel.send({embed})
  }
}
