import Lifeform from "#core/Lifeform.js";
import Attribute from "#core/Attribute.js";

/**
 * 鬼竹·维尔戈
 */
export default new Lifeform({
  name: "鬼竹·维尔戈",
  level: 1,
  baseAttack: 29,
  baseArmor: 10,
  baseHealth: 300,
  baseHealthRecover: 2.3,
  baseMana: 90,
  baseManaRecover: 0.5,
  baseStrength: 27,
  strengthGrowth: 2.9,
  baseAgility: 24,
  agilityGrowth: 2.9,
  baseIntelligence: 19,
  intelligenceGrowth: 1.5,
  attribut: Attribute.universal,
  innateAbility: {
    name: "内在优势",
    description: "维尔戈从属性中获得的收益增加 25%",
    effect: (lifeform) => {
      lifeform.strengthGain.health *= 1.25;
      lifeform.strengthGain.healthRecover *= 1.25;
      lifeform.agilityGain.armor *= 1.25;
      lifeform.agilityGain.baseAttack *= 1.25;
      lifeform.intelligenceGain.mana *= 1.25;
      lifeform.intelligenceGain.manaRecover *= 1.25;
      lifeform.intelligenceGain.skillEnhancement *= 1.25;
      lifeform.universalGain.baseAttackFromAllAttribute *= 1.25;
    },
  },
});
