import Attribute from "#src/core/Attribute.js";

/**
 * 生命体
 * 所有单位的基类
 */
export default class Lifeform {
  // 额外攻击力
  extraAttack = 0;

  constructor({
    baseHealth = 200,
    baseMana = 100,
    baseAttack,
    attribut,
    strength,
    agility,
    intelligence,
  }) {
    // 基础血量
    this.baseHealth = baseHealth;
    // 基础魔法值
    this.baseMana = baseMana;
    // 基础攻击力
    this.__baseAttack = baseAttack;

    // 主属性
    this.attribut = attribut;
    // 力量属性
    this.strength = strength;
    // 敏捷属性
    this.agility = agility;
    // 智力属性
    this.intelligence = intelligence;
  }

  get health() {
    return this.baseHealth + this.strength * 20;
  }

  get mana() {
    return this.baseMana + this.intelligence * 13;
  }

  /**
   * 基础攻击力
   */
  get baseAttack() {
    if (this.attribut !== Attribute.universal) {
      return this.__baseAttack + this[this.attribut];
    }
    return (
      this.__baseAttack +
      (this.strength + this.agility + this.intelligence) * 0.7
    );
  }

  /**
   * 总攻击力
   */
  get attack() {
    return this.baseAttack + this.extraAttack;
  }
}
