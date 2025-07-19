import Attribute from "#core/Attribute.js";

/**
 * 生命体
 * 所有单位的基类
 */
export default class Lifeform {
  constructor({
    name,
    level = 1,
    baseHealth,
    baseHealthRecover,
    baseMana,
    baseManaRecover,
    baseAttack,
    baseArmor,
    baseMagicResistance = 0.25,
    attribut,
    baseStrength,
    strengthGrowth,
    strengthGain = Attribute.strengthGain,
    baseAgility,
    agilityGrowth,
    agilityGain = Attribute.agilityGain,
    baseIntelligence,
    intelligenceGrowth,
    intelligenceGain = Attribute.intelligenceGain,
    universalGain = Attribute.universalGain,
    innateAbility,
  }) {
    // 名字
    this.name = name;
    // 等级
    this.level = level;

    // 基础血量
    this.baseHealth = baseHealth;
    // 基础魔法值
    this.baseMana = baseMana;
    // 基础血量恢复
    this.baseHealthRecover = baseHealthRecover;
    // 基础魔法值恢复
    this.baseManaRecover = baseManaRecover;
    // 基础攻击力
    this.__baseAttack = baseAttack;
    // 基础护甲
    this.__baseArmor = baseArmor;
    // 基础魔法抗性
    this.__baseMagicResistance = baseMagicResistance;

    // 主属性
    this.attribut = attribut;
    // 力量属性
    this.__baseStrength = baseStrength;
    // 力量成长
    this.strengthGrowth = strengthGrowth;
    // 力量收益
    this.strengthGain = strengthGain;
    // 敏捷属性
    this.__baseAgility = baseAgility;
    // 敏捷成长
    this.agilityGrowth = agilityGrowth;
    // 敏捷收益
    this.agilityGain = agilityGain;
    // 智力属性
    this.__baseIntelligence = baseIntelligence;
    // 智力成长
    this.intelligenceGrowth = intelligenceGrowth;
    // 智力收益
    this.intelligenceGain = intelligenceGain;
    // 全才收益
    this.universalGain = universalGain;

    // 先天技能
    this.innateAbility = innateAbility;
    this.innateAbility?.effect?.(this);
  }

  /**
   * 力量
   */
  get strength() {
    return this.__baseStrength + this.strengthGrowth * (this.level - 1);
  }

  /**
   * 敏捷
   */
  get agility() {
    return this.__baseAgility + this.agilityGrowth * (this.level - 1);
  }

  /**
   * 智力
   */
  get intelligence() {
    return this.__baseIntelligence + this.intelligenceGrowth * (this.level - 1);
  }

  /**
   * 总血量
   */
  get health() {
    return this.baseHealth + this.strength * this.strengthGain.health;
  }

  /**
   * 总血量恢复速率
   */
  get healthRecover() {
    return (
      this.baseHealthRecover + this.strength * this.strengthGain.healthRecover
    );
  }

  /**
   * 总魔法值
   */
  get mana() {
    return this.baseMana + this.intelligence * this.intelligenceGain.mana;
  }

  /**
   * 总魔法值恢复速率
   */
  get manaRecover() {
    return (
      this.baseManaRecover +
      this.intelligence * this.intelligenceGain.manaRecover
    );
  }

  /**
   * 基础攻击力
   */
  get baseAttack() {
    // 敏捷属性提供的额外基础攻击力
    const extraBaseAttackFromAgility =
      this.agility * this.agilityGain.baseAttack;

    if (this.attribut !== Attribute.universal) {
      return (
        this.__baseAttack + this[this.attribut] + extraBaseAttackFromAgility
      );
    }
    return (
      this.__baseAttack +
      (this.strength + this.agility + this.intelligence) *
        this.universalGain.baseAttackFromAllAttribute +
      extraBaseAttackFromAgility
    );
  }

  /**
   * 总攻击力
   */
  get attack() {
    return this.baseAttack;
  }

  /**
   * 技能增强
   */
  get skillEnhancement() {
    return this.intelligence * this.intelligenceGain.skillEnhancement;
  }

  /**
   * 基础护甲
   */
  get baseArmor() {
    return this.__baseArmor + this.agility * this.agilityGain.armor;
  }

  /**
   * 总护甲
   */
  get armor() {
    return this.baseArmor;
  }

  /**
   * 总魔抗
   */
  get magicResistance() {
    return (
      this.__baseMagicResistance +
      this.strength * this.strengthGain.magicResistance
    );
  }
}
