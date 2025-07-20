import Lifeform from "#core/Lifeform.js";
import Attribute from "#core/Attribute.js";

/**
 * 百兽之王·凯多
 */
export default new Lifeform({
  name: "百兽之王·凯多",
  level: 1,
  baseAttack: 35,
  baseAttackRange: 2,
  baseArmor: 8,
  baseHealth: 400,
  baseHealthRecover: 2.6,
  baseMana: 190,
  baseManaRecover: 0.75,
  baseStrength: 35,
  strengthGrowth: 5.0,
  baseAgility: 25,
  agilityGrowth: 2.8,
  baseIntelligence: 17,
  intelligenceGrowth: 1.4,
  attribut: Attribute.strength,
  innateAbility: {
    name: "铁血龙胆",
    description: "每损失 1% 最大生命值获得 1% 免伤",
    effect(lifeform) {
      if ((lifeform?.currentHealth ?? 0) <= 0) {
        return;
      }
      const originalDamageRedution = lifeform.baseDamageRedution;
      lifeform.baseDamageRedution =
        1 -
        (lifeform.currentHealth / lifeform.health) *
          (1 + originalDamageRedution);
    },
  },
});
