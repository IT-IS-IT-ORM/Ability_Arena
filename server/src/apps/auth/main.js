import User from "#src/db/collections/user.js";
import { UserSerializer } from "#apps/user/serializer.js";

export class AuthApi {
  constructor() {
    this.userModel = User;
  }

  create = async (ctx) => {
    const { username } = ctx.request.body;

    const user = await this.userModel.create({ username });

    ctx.body = {
      data: await new UserSerializer(user).toJSON(),
    };
  };

  login = async (ctx) => {
    const { username } = ctx.request.body;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      ctx.body = {
        message: "auth.account_does_not_exist",
      };
      ctx.status = 400;
      return;
    }

    if (user.isOnline) {
      ctx.body = {
        message: "auth.account_already_online",
      };
      ctx.status = 400;
      return;
    }

    ctx.body = {
      data: await new UserSerializer(user).toJSON(),
    };
    ctx.status = 200;
  };
}
