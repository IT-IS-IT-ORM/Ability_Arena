import { AppDataSource } from "#root/typeorm.config.js";
import { UserEntity } from "#root/apps/user/entity.js";
import { UserSerializer } from "#root/apps/user/serializer.js";

import fs from "fs";
import path from "path";

export class UserApi {
  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  list = async (ctx) => {
    const users = await this.userRepository.find();
    const serializedUsers = await Promise.all(
      users.map((user) => new UserSerializer(user, ctx).toJSON())
    );

    ctx.body = {
      data: serializedUsers,
    };
    ctx.status = 200;
  };

  retrieve = async (ctx) => {
    const { id } = ctx.params;
    const user = await this.userRepository.findOne({ where: { id } });

    ctx.body = {
      data: await new UserSerializer(user, ctx).toJSON(),
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
      user = await this.userRepository.findOne({ where: { id } });
    }

    if (ctx.request?.files?.avatar) {
      const file = ctx.request.files.avatar;

      // Remove old avatar if exists
      if (user.avatar) {
        const oldAvatarPath = path.join(process.cwd(), user.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      // Save new avatar
      const filePath = path.join(
        process.cwd(),
        "media/user/avatar",
        file.newFilename
      );
      const stream = fs.createWriteStream(filePath);
      stream.end(file._buffer);

      user.avatar = `media/user/avatar/${file.newFilename}`;
    }

    if (ctx.request?.files?.backgroundImage) {
      const file = ctx.request.files.backgroundImage;

      // Remove old backgroundImage if exists
      if (user.backgroundImage) {
        const oldBackgroundImagePath = path.join(
          process.cwd(),
          user.backgroundImage
        );
        fs.unlinkSync(oldBackgroundImagePath);
      }

      // Save new backgroundImage
      const filePath = path.join(
        process.cwd(),
        "media/user/backgroundImage",
        file.newFilename
      );
      const stream = fs.createWriteStream(filePath);
      stream.end(file._buffer);

      user.backgroundImage = `media/user/backgroundImage/${file.newFilename}`;
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...ctx.request.body,
    });

    ctx.body = {
      data: await new UserSerializer(updatedUser, ctx).toJSON(),
    };
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const { id } = ctx.params;

    if (!ctx.isAuthenticated) {
      ctx.status = 401;
      return;
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      ctx.body = {
        message: "用户不存在",
      };
      ctx.status = 404;
      return;
    }

    await this.userRepository.delete(id);

    ctx.status = 200;
  };
}
