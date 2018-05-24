module.exports = function (msg, request) {
  const http_request = require('request');
  let string = request.query;
  http_request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+ string, function (error, response, body) {
    if (error) {
      console.log('error:', error);
      return;
    }
    let url = JSON.parse(body).data.url;
    return msg.channel.sendMessage('Here is a random gif of: ' + string + '\n' + url);
  });
}
