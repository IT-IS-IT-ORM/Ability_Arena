import Lifeform from "#core/Lifeform.js";
import Attribute from "#core/Attribute.js";

/**
 * 杀戮兵器·路奇
 */
export default new Lifeform({
  name: "杀戮兵器·路奇",
  level: 1,
  baseAttack: 22,
  baseAttackRange: 1,
  baseArmor: 4,
  baseHealth: 260,
  baseHealthRecover: 2.2,
  baseMana: 170,
  baseManaRecover: 0.6,
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
