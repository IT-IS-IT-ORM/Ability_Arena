import User from "#src/db/collections/user.js";
import { UserSerializer } from "#apps/user/serializer.js";

export class UserApi {
  constructor() {
    this.userModel = User;
  }

  list = async (ctx) => {
    const users = await this.userModel.find();
    const serializedUsers = await Promise.all(
      users.map((user) => new UserSerializer(user).toJSON())
    );

    ctx.body = {
      data: serializedUsers,
    };
    ctx.status = 200;
  };

  retrieve = async (ctx) => {
    const { id } = ctx.params;
    const user = await this.userModel.findById(id);

    if (!user) {
      ctx.status = 404;
      return;
    }

    ctx.body = {
      data: await new UserSerializer(user).toJSON(),
    };
    ctx.status = 200;
  };

  partialUpdate = async (ctx) => {
    const { id } = ctx.params;

    if (!ctx.isAuthenticated) {
      ctx.status = 401;
      return;
    }

    let user;

    if (ctx.user.id === id) {
      user = ctx.user;
    } else {
      user = await this.userModel.findById(id);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      ...user,
      ...ctx.request.body,
    });

    ctx.body = {
      data: await new UserSerializer(updatedUser).toJSON(),
    };
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const { id } = ctx.params;

    if (!ctx.isAuthenticated) {
      ctx.status = 401;
      return;
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      ctx.body = {
        message: "用户不存在",
      };
      ctx.status = 404;
      return;
    }

    await this.userModel.findByIdAndDelete(id);

    ctx.status = 200;
  };
}
