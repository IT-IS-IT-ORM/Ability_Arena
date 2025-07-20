import Skill from "#src/core/Skill/index.js";
import ImpactTarget from "#src/core/Skill/ImpactTarget.js";
import DamageType from "#src/core/Damage/DamageType.js";
import SkillType from "#src/core/Skill/CastType.js";

export default new Skill({
  name: "六王枪",
  description:
    "六式奥义·六王枪, 产生巨大冲击波, 冲击波会穿透目标, 对范围内单位造成暴击伤害",
  impactTarget: ImpactTarget.enemy,
  damageType: DamageType.physical,
  ignoresDebuffImmunity: true,
  canBeDispelled: false,
  healthConsumption: 0,
  manaConsumption: 220,
  cooldown: 10,
  castType: SkillType.instant,
  channelTime: 0,
  castingRange: 3,
  areaOfEffect: 3,
});
