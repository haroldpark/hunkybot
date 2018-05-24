module.exports = {
  item:  {
    packageBaseStats: function (kind, attributes_base, canHq) {


      if (kind == 'Arms' || kind == 'Armor') {

        if (kind == 'Arms') {
          let auto_attackTemplate = '*Auto Attack*: ' + attributes_base['auto_attack'];
          let auto_attackDesc = ((!canHq) ? auto_attackTemplate : auto_attackTemplate + '(' + attributes_base['auto_attack_hq'] + '*)')
          let damageTemplate = '*Damage*: ' + attributes_base['damage'];
          let damageDesc = ((!canHq) ? damageTemplate : damageTemplate + '(' + attributes_base['damage_hq'] + '*)')
          let delayTemplate = '*Delay*: ' + attributes_base['delay'];
          let delayDesc = ((!canHq) ? delayTemplate : delayTemplate + '(' + attributes_base['delay_hq'] + '*)')
          let magicDamageTemplate = '*Magic Damage*: ' + attributes_base['magic_damage'];
          let magicDamageDesc = ((!canHq) ? magicDamageTemplate : magicDamageTemplate + '(' + attributes_base['magic_damage_hq'] + '*)')
          return auto_attackDesc + ' | ' + damageDesc + ' | ' + delayDesc + ' | ' + magicDamageDesc;


        }

        if (kind == 'Armor') {

          /*
          if (category_name == 'Shield') {
            let blockRateTemplate = '*Block Rate*: ' + attributes_base['block_rate'];
            let blockRateDesc = ((!detailedData.can_be_hq) ? blockRateTemplate : blockRateTemplate + '(' + attributes_base['block_rate_hq'] + '*)')
            let blockStrengthTemplate = '*Block Strength*: ' + attributes_base['block_strength'];
            let blockStrengthDesc = ((!detailedData.can_be_hq) ? blockStrengthTemplate : blockStrengthTemplate + '(' + attributes_base['block_strength_hq'] + '*)');
            baseStats += blockRateDesc + ' | ' + blockStrengthDesc;
          }
          */
          //else {
            let defenseTemplate = '*Defense*: ' + attributes_base['defense'];
            let defenseDesc = ((!canHq) ? defenseTemplate : defenseTemplate + '(' + attributes_base['defense_hq'] + 'HQ)')
            let magicDefenseTemplate = '*Magic Defense*: ' + attributes_base['magic_defense'];
            let magicDefenseDesc = ((!canHq) ? magicDefenseTemplate : magicDefenseTemplate + '(' + attributes_base['magic_defense_hq'] + 'HQ)');
            return defenseDesc + ' | ' + magicDefenseDesc;

          //}


        }

      }

      if (kind == 'Medicines & Meals') {
        if (category_name == 'Meal') {

        }

      }













    },

    packageAttributes: function (attributes) {
      if (attributes.length) {
        let attributesStr = '';
        for (let i=0; i<attributes.length; i++) {
          if (attributes[i].name) {
            attributesStr += '*' + attributes[i].name + '*: ' + attributes[i].value + ' (' + attributes[i].value_hq + ' HQ)';
            if (i !== attributes.length - 1) {
              attributesStr += ' | ';
            }
          }
        }
        return attributesStr;
      } else {
        return 'None';
      };
    },

    packageOtherProps: function (props) {
      let otherPropsOutput = '';
      for (let key in props) {
        if (props[key]) {
          otherPropsOutput += key + ' ';
        }
      }
      return otherPropsOutput;
    },

    packageQuestReward: function (quests) {
      if (quests) {
        questsOutput = '';
        for (let i=0; i<quests.length; i++) {
          questsOutput += '[' + quests[i].name + '](' + quests[i].url_xivdb + ')';
          questsOutput += ': ' + quests[i].class_category_1 + ' lvl ' + quests[i].class_level_1
        }
        return questsOutput;
      } else {
        return 'None';
      }
    },

    packageRecipes: function (craftable) {
      console.log('CEAFIJAEOI', craftable);
    },

    packageMerchant: function () {

    }

  }

  //more categories here





}
