const config = require('./config.json');
const prefix = config.prefix;

const routes = require("./routes/index.js")(config);

console.log('Discord bot is running!');
