export default {
  // 力量
  strength: "strength",
  // 敏捷
  agility: "agility",
  // 智力
  intelligence: "intelligence",
  // 全才
  universal: "universal",

  // 属性收益
  strengthGain: {
    health: 20,
    healthRecover: 0.63,
    magicResistance: 0.15,
  },
  agilityGain: {
    armor: 0.33,
    baseAttack: 0.33,
  },
  intelligenceGain: {
    mana: 13,
    manaRecover: 0.82,
    skillEnhancement: 0.25,
  },
  universalGain: {
    // 基于全属性的基础攻击力加成系数
    baseAttackFromAllAttribute: 0.7,
  },
};
