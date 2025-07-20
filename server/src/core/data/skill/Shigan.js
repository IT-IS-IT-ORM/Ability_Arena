import Skill from "#src/core/Skill/index.js";
import ImpactTarget from "#src/core/Skill/ImpactTarget.js";
import DamageType from "#src/core/Damage/DamageType.js";
import SkillType from "#src/core/Skill/CastType.js";

export default new Skill({
  name: "指枪",
  description: "六式之一, 强化指尖对目标物理伤害",
  impactTarget: ImpactTarget.enemy,
  damageType: DamageType.physical,
  ignoresDebuffImmunity: true,
  canBeDispelled: false,
  healthConsumption: 0,
  manaConsumption: 30,
  cooldown: 1,
  castType: SkillType.instant,
  channelTime: 0,
  castingRange: 1,
  areaOfEffect: 0,
});
