const request = require('request');
const config = require('./config.json');
const prefix = config.prefix;

const youtubeStream = require('youtube-audio-stream');
const routes = require("./routes/index.js")(config);

console.log('Discord bot is running!');
