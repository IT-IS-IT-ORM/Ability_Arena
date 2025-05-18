export class UserSerializer {
  constructor(user, ctx = null) {
    this.user = user;
    this.ctx = ctx;
  }

  async toJSON() {
    const userObj = { ...this.user };

    delete userObj.password;

    return userObj;
  }
}
