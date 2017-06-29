const helpers = require('../../helpers/helpers.js');
const http_request = require('request');
const Discord = require('discord.js');

module.exports = function (query, channel) {

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

          let kind_name = searchData.kind_name;
          let armsProperties = ['level_equip', 'level_item', 'attributes_base', 'attributes_params', 'can_be_hq', 'craftable', 'item_glamour', 'price_sell', 'price_sell_hq']
          let name = searchData.name;
          let url_xivdb = searchData.url_xivdb;
          let category_name = searchData.category_name;
          let icon = searchData.icon;

          let slot_name = detailedData.slot_name;
          let level_equip = detailedData.level_equip;
          let level_item = detailedData.level_item;
          let can_be_hq = ((detailedData.can_be_hq) ? 'Yes' : 'No');
          let price_sell = ((detailedData.can_be_hq) ? detailedData.price_sell + '(' + detailedData.price_sell_hq + '*) ' : detailedData.price_sell);
          let patch = detailedData.patch.number;
          let attributes_base = detailedData.attributes_base;
          let attributes_params = detailedData.attributes_params;
          let craftable = ((detailedData.craftable) ? 'Yes' : 'No');
          let item_glamour = ((detailedData.item_glamour) ? '[' + detailedData.item_glamour.name + '](' + detailedData.item_glamour.url_xivdb : undefined);

          let quests = '';
          for (let i=0; i<detailedData.quests.length; i++) {
            quests += '[' + detailedData.quests[i].name + '](' + detailedData.quests[i].url_xivdb + ')';
            quests += ': ' + detailedData.quests[i].class_category_1 + ' ' + detailedData.quests[i].class_level_1
          }


          //HAVE TO INVLUDE HQ functionality

          let baseStats = '';
          let itemAttributes = '';

          if (attributes_params.length) {
            for (let i=0; i<attributes_params.length; i++) {
              if (attributes_params[i].name) {
                itemAttributes += '*' + attributes_params[i].name + '*: ' + attributes_params[i].value + ' (' + attributes_params[i].value_hq + ' HQ)';
                if (i !== attributes_params.length - 1) {
                  itemAttributes += ' | ';
                }
              }
            }
          } else {
            itemAttributes += 'None';
          };

          const embed = new Discord.RichEmbed()
            .setTitle(name)
            .setURL(url_xivdb)
            .setColor(0x00AE86)
            //.setDescription(category_name)
            .setThumbnail(icon)
          embed.addField('Attributes', itemAttributes);
          embed.addField('Can be HQ', can_be_hq, true);
          embed.addField('Craftable', craftable, true);
          embed.addField('Item level', level_item, true);
          embed.addField('Quest Reward', quests)

          if (kind_name == 'Arms' || kind_name == 'Armor') {

            if (kind_name == 'Arms') {
              let auto_attackTemplate = '*Auto Attack*: ' + attributes_base['auto_attack'];
              let auto_attackDesc = ((!detailedData.can_be_hq) ? auto_attackTemplate : auto_attackTemplate + '(' + attributes_base['auto_attack_hq'] + '*)')
              let damageTemplate = '*Damage*: ' + attributes_base['damage'];
              let damageDesc = ((!detailedData.can_be_hq) ? damageTemplate : damageTemplate + '(' + attributes_base['damage_hq'] + '*)')
              let delayTemplate = '*Delay*: ' + attributes_base['delay'];
              let delayDesc = ((!detailedData.can_be_hq) ? delayTemplate : delayTemplate + '(' + attributes_base['delay_hq'] + '*)')
              let magicDamageTemplate = '*Magic Damage*: ' + attributes_base['magic_damage'];
              let magicDamageDesc = ((can_be_hq) ? magicDamageTemplate : magicDamageTemplate + '(' + attributes_base['magic_damage_hq'] + '*)')
              baseStats += auto_attackDesc + ' | ' + damageDesc + ' | ' + delayDesc + ' | ' + magicDamageDesc;

              embed.addField('Equip level', level_equip, true);
              embed.addField('Slot', slot_name, true);
              embed.addField('Can be HQ', can_be_hq, true);
              embed.addField('Glamor Item', item_glamour, true);
              embed.addField('Craftable', craftable, true);
              embed.addField('Base Stats', baseStats);
            }

            if (kind_name == 'Armor') {
              if (category_name == 'Shield') {
                let blockRateTemplate = '*Block Rate*: ' + attributes_base['block_rate'];
                let blockRateDesc = ((!detailedData.can_be_hq) ? blockRateTemplate : blockRateTemplate + '(' + attributes_base['block_rate_hq'] + '*)')
                let blockStrengthTemplate = '*Block Strength*: ' + attributes_base['block_strength'];
                let blockStrengthDesc = ((!detailedData.can_be_hq) ? blockStrengthTemplate : blockStrengthTemplate + '(' + attributes_base['block_strength_hq'] + '*)');
                baseStats += blockRateDesc + ' | ' + blockStrengthDesc;
              } else {
                let defenseTemplate = '*Defense*: ' + attributes_base['defense'];
                let defenseDesc = ((!detailedData.can_be_hq) ? defenseTemplate : defenseTemplate + '(' + attributes_base['defense_hq'] + '*)')
                let magicDefenseTemplate = '*Magic Defense*: ' + attributes_base['magic_defense'];
                let magicDefenseDesc = ((!detailedData.can_be_hq) ? magicDefenseTemplate : magicDefenseTemplate + '(' + attributes_base['magic_defense_hq'] + '*)');
                baseStats += defenseDesc + ' | ' + magicDefenseDesc;
                embed.addField('Equip level', level_equip, true);
                embed.addField('Slot', slot_name, true);
                embed.addField('Glamor Item', item_glamour, true);
                embed.addField('Base Stats', baseStats);
              }


            }

          }

          if (kind_name == 'Medicines & Meals') {
            if (category_name == 'Meal') {

            }

          }

            //embed.addField('Attributes', relevantData.craftable)
            embed.setFooter('Released patch ' + patch + ' | Sells for ' + price_sell, 'http://i.imgur.com/w1vhFSR.png')
            return channel.send({embed});

          }
        });
      }
    });
}
