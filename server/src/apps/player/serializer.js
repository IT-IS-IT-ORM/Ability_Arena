export class PlayerSerializer {
  constructor(player, ctx = null) {
    this.player = player;
    this.ctx = ctx;
  }

  async toJSON() {
    const playerObj = this.player._doc;

    delete playerObj.password;

    return playerObj;
  }
}
