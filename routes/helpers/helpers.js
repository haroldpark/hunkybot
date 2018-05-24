const request = require('request');
const Discord = require('discord.js');

module.exports = {
  seperateQuery: function (query) {
    let words = query.split(" ");

    let queryParts =  {};
    queryParts.command = words[0];
    if (words[2]) {
      queryParts.category = words[1];
      queryParts.string = words[2];
    } else {
      queryParts.string = words[1];
    }
    return queryParts
  },

  giveOptions: function (namesArray) {
    let message = '';
    message += namesArray.join(' ');
    return message;
  },

  findTargetResult: function (resultsArray, targetStr) {
    for (let i=0; i<resultsArray.length; i++) {
      if (resultsArray[i].name.toLowerCase() == targetStr.toLowerCase()) {
        return resultsArray[i];
      }
    }
    return undefined;
  },

  getRelevantData: function (searchData, detailedData) {
    let relevantData = {};
    relevantData.name = searchData.name
    relevantData.xivdbUrl = searchData.url_xivdb;
    relevantData.category = searchData.category_name;
    relevantData.icon = searchData.icon;
    relevantData.patch = detailedData.patch.number;
    relevantData.sellPrice = detailedData.price_sell;
    relevantData.sellPriceHq = detailedData.price_sell_hq;
    relevantData.canHq = detailedData.can_be_hq
    relevantData.attributeParams = detailedData.attributes_params

    if (searchData.kind_name == 'Arms') {
      if (detailedData.can_be_hq == true) {
        console.log('THIS ITEM CAN BE HQ');
      }
      relevantData.itemLevel = searchData.level_item;
      relevantData.equipLevel = searchData.level_equip;
      relevantData.slot = detailedData.slot_name
      relevantData.glamorItem = detailedData.item_glamour;
      relevantData.craftable = detailedData.craftable;
      relevantData.attributesBase = {
        autoAttack: detailedData.attributes_base.auto_attack,
        blockRate: detailedData.attributes_base.auto_attack,
        blockStrength: detailedData.attributes_base.auto_attack,
        damage: detailedData.attributes_base.auto_attack,
        defense: detailedData.attributes_base.auto_attack,
        delay: detailedData.attributes_base.auto_attack,
        dps: detailedData.attributes_base.auto_attack,
        magicDamage: detailedData.attributes_base.auto_attack,
        magicDefense: detailedData.attributes_base.auto_attack
      }
    }
    return relevantData;
  },

  packageEmbedMessage: function () {
    const embed = new Discord.RichEmbed().setTitle('dfdfdfd')
    return embed;
  },

  api: {
    searchFFXIVRecipes: function (string) {
        requestUrl = 'http://api.xivdb.com/search?one=recipes&string=' + string;
        console.log('HERE IS REQUESTURL', requestUrl)
        request(requestUrl, function (error, response, body) {
          if (error) {
            console.log('error:', error);
            return;
          } else {
            let data = JSON.parse(body);
            console.log('data is here', data);
            return data;
          }
        });
    }
  }
}
