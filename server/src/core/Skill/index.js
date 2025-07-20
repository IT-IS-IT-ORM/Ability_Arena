/**
 * 技能
 */
export default class Skill {
  constructor({
    name,
    description,
    impactTarget,
    damageType,
    ignoresDebuffImmunity,
    canBeDispelled,
    healthConsumption = 0,
    manaConsumption,
    cooldown,
    castType,
    channelTime,
    castingRange,
    areaOfEffect,
  }) {
    this.name = name;
    this.description = description;
    // 伤害类型
    this.damageType = damageType;
    // 是否无视减益免疫
    this.ignoresDebuffImmunity = ignoresDebuffImmunity;
    // 是否可以被驱散
    this.canBeDispelled = canBeDispelled;
    // 影响目标
    this.impactTarget = impactTarget;
    // 消耗生命值
    this.healthConsumption = healthConsumption;
    // 消耗魔法值
    this.manaConsumption = manaConsumption;
    // 冷却时间
    this.cooldown = cooldown;

    // 施法类型
    this.castType = castType;
    // 持续施法时间
    this.channelTime = channelTime;
    // 施法范围
    this.castingRange = castingRange;
    // 范围半径
    this.areaOfEffect = areaOfEffect;
  }
}
