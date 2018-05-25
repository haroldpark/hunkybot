const helpers = require('../helpers/helpers.js');
const http_request = require('request');
const Discord = require('discord.js');
const ffxivHelpers = require('../helpers/ffxiv_helpers.js');

module.exports = (query, channel) => {

  let requestUrl = 'http://api.xivdb.com/search?one=items&string='+ query;
  console.log('QUERY:', query, 'REQUESTURL:', requestUrl);

  //initial search
  http_request(requestUrl, function (error, response, body) {
    if (error) {
      return console.log('Error:', error);
    } else {
      let data = JSON.parse(body);
      let results = data.items.results;
      let searchData = helpers.findTargetResult(results, query);

      if (!searchData) {
        channel.send({embed: {color: 0x00AE86, description: 'Your search did not return any results!'}});
        return;
      }

      http_request(searchData.url_api, function (error2, response2, body2) {
        if (error2) {
          console.log('Error:', error2);
          return;
        } else {
          let detailedData = JSON.parse(body2);
          //let relevantData = helpers.getRelevantData(searchData, detailedData);

          //Data from first request
          let name = searchData.name;
          let kindName = searchData.kind_name;
          let urlXivdb = searchData.url_xivdb;
          let icon = searchData.icon;

          //Detailed data from second request
          let patch = detailedData.patch.number;
          let priceSell = ((detailedData.can_be_hq) ? detailedData.price_sell + '(' + detailedData.price_sell_hq + '*) ' : detailedData.price_sell);
          let canBeHq = ((detailedData.can_be_hq) ? true : false);

          let levelEquip = detailedData.level_equip;
          let levelItem = detailedData.level_item;
          let classJob = detailedData.classjob_category;
          let slotName = detailedData.slot_name;

          let materiaSlotCount = detailedData.materia_slot_count;
          let otherPropData = {
            'Collectable': detailedData.is_collectable,
            'Convertible': detailedData.is_convertible,
            'CrestWorthy': detailedData.is_crest_worthy,
            'Desynthesizable': detailedData.is_desynthesizable,
            'Dyeable': detailedData.is_dyeable,
            'Projectable': detailedData.is_projectable,
            'Reducible': detailedData.is_reducible,
            'Unique': detailedData.is_unique,
            'Untradable': detailedData.is_untradabale
          }
          let otherProps = ffxivHelpers.item.packageOtherProps(otherPropData)
          let questRewards = ffxivHelpers.item.packageQuestReward(detailedData.quests);

          //let craftable = ((detailedData.craftable) ? 'Yes' : 'No');
          //let item_glamour = ((detailedDatchooa.item_glamour) ? '[' + detailedData.item_glamour.name + '](' + detailedData.item_glamour.url_xivdb : undefined);

          let baseStats = ffxivHelpers.item.packageBaseStats(kindName, detailedData.attributes_base, canBeHq);
          let attributes = ffxivHelpers.item.packageAttributes(detailedData.attributes_params);
          let recipes = ffxivHelpers.item.packageRecipes(detailedData.craftable);

          const embed = new Discord.RichEmbed()
            .setTitle(name)
            .setURL(urlXivdb)
            .setColor(0x00AE86)
            //.setDescription(category_name)
            .setThumbnail(icon)
          embed.addField('Base Stats', baseStats);
          embed.addField('Attributes', attributes);
          embed.addField('Item level', levelItem, true);
          embed.addField('Equip level', levelEquip, true);
          embed.addField('Class/Job', classJob, true);
          embed.addField('Category', kindName)
          embed.addField('Slot', slotName, true);
          embed.addField('Materia Slots', materiaSlotCount, true);
          embed.addField('Other Properties', otherProps);
          //embed.addField('Recipe')
          embed.addField('Quest Reward', questRewards);
          //embed.addField('Merchant')
          //embed.addField('Can be HQ', can_be_hq, true);
          //embed.addField('Craftable', craftable, true);
          //embed.addField('Rewarded From:', quests)
          //embed.addField('Glamor Item', item_glamour, true);
            //embed.addField('Attributes', relevantData.craftable)
          embed.setFooter('Released patch ' + patch + ' | Sells for ' + priceSell, 'http://i.imgur.com/w1vhFSR.png')
          return channel.send({embed});
        }
      });
    }
  });
}
