export class LifeformSerializer {
  constructor(lifeform, ctx = null) {
    this.lifeform = lifeform;
    this.ctx = ctx;
  }

  async toJSON() {
    // 移除 innateAbility 中的 effect 属性
    const { innateAbility, ...otherOptions } = this.lifeform;
    const { effect, ...innateAbilityWithoutEffect } = innateAbility || {};
    const lifeformObj = {
      ...otherOptions,
      innateAbility: innateAbilityWithoutEffect,
    };

    return lifeformObj;
  }
}
