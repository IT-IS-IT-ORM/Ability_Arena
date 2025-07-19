import { Lucci, Vergo } from "#core/data/lifeform/index.js";

/**
 * 杀戮兵器·路奇
 */
const Lucci = new Lucci({
  name: "杀戮兵器·路奇",
  level: 1,
  baseAttack: 22,
  baseArmor: 4,
  baseHealth: 260,
  baseMana: 170,
  baseStrength: 29,
  strengthGrowth: 2.5,
  baseAgility: 33,
  agilityGrowth: 3.1,
  baseIntelligence: 20,
  intelligenceGrowth: 2.3,
  attribut: Attribute.agility,
  innateAbility: {
    name: "六王枪",
    description: "路奇的`六式`更具威力, 获得任意六式解锁附加技能`六王枪`",
    isClientSideEffect: true,
  },
});

/**
 * 鬼竹·维尔戈
 */
const Vergo = new Vergo({
  name: "鬼竹·维尔戈",
  level: 1,
  baseAttack: 29,
  baseArmor: 10,
  baseHealth: 300,
  baseMana: 90,
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

globalThis.Lucci = Lucci;
console.log("Lucci: ", Lucci);
globalThis.Vergo = Vergo;
console.log("Vergo: ", Vergo);

function keepAlive(ms) {
  setTimeout(keepAlive, ms);
  console.log("程序正在保活...");
}

keepAlive(1000 * 60 * 60 * 24);
