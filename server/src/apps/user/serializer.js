import { AppDataSource } from "#root/typeorm.config.js";
import {
  UserAboutMeEntity,
  UserAboutMeLikeEntity,
} from "#root/apps/user/entity.js";

export class UserSerializer {
  constructor(user, ctx = null) {
    this.user = user;
    this.ctx = ctx;
  }

  async toJSON() {
    const userObj = { ...this.user };

    userObj.tags = userObj.tags ? userObj.tags.split(",") : [];

    userObj.aboutMe = null;

    if (userObj.avatar) {
      const protocol = this.ctx.protocol;
      const host = this.ctx.headers.host;
      userObj.avatar = `${protocol}://${host}/${userObj.avatar}`;
    }

    if (userObj.backgroundImage) {
      const protocol = this.ctx.protocol;
      const host = this.ctx.headers.host;
      userObj.backgroundImage = `${protocol}://${host}/${userObj.backgroundImage}`;
    }

    const userAboutMeRepository =
      AppDataSource.getRepository(UserAboutMeEntity);
    const aboutMe = await userAboutMeRepository.findOne({
      where: { userId: userObj.id },
    });

    if (aboutMe) {
      const userAboutMeLikeRepository = AppDataSource.getRepository(
        UserAboutMeLikeEntity
      );
      const aboutMeLike = await userAboutMeLikeRepository.count({
        where: { aboutMeId: aboutMe.id },
      });

      userObj.aboutMe = {
        like: aboutMeLike,
        content: aboutMe.content,
      };
    }

    delete userObj.password;

    return userObj;
  }
}
