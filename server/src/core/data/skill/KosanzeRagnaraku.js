import Skill from "#core/Skill.js";
import ImpactTarget from "#core/ImpactTarget.js";
import DamageType from "#core/DamageType.js";

export default new Skill({
  name: "降三世·引奈落",
  description: "赋予武器霸王色霸气, 对目标造成物理伤害",
  impactTarget: ImpactTarget.enemy,
  damageType: DamageType.physical,
  ignoresDebuffImmunity: true,
  canBeDispelled: false,
  healthConsumption: 0,
  manaConsumption: 200,
  cooldown: 10,
  castType: SkillType.instant,
  channelTime: 0,
  castingRange: 1,
  areaOfEffect: 0,
});
