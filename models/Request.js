module.exports = class Request {
  constructor (request) {
    this.request = request;
    this.words = this.request.split(" ");
    this.command = this.words[0].substring(1); //first word minus the '$' prefix
    this.category = (this.words.length > 2) ? this.words[1] : undefined;
    this.query = (this.words.length > 2) ? this.words.slice(2, this.words.length).join(' ') : this.words.slice(1, this.words.length).join(' ');
  }

  validateCommand () {
    var validCommands = ['help', 'giphy', 'recipes', 'ffxiv', 'soundboard'];

    for (let i=0; i<validCommands.length; i++) {
      if (this.command == validCommands[i]) {
        return true;
      }
    }
    return false;
  }

}
