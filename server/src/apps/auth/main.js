import { AppDataSource } from "#root/typeorm.config.js";
// Entity
import { UserEntity } from "#root/apps/user/entity.js";
// Serializer
import { UserSerializer } from "#root/apps/user/serializer.js";
// Redis
import redis from "#root/redis/index.js";
// Utils
import { randomString } from "#root/utils/index.js";
// Email
import { sendMail } from "#root/email/index.js";
import path from "path";
import fs from "fs/promises";
import ejs from "ejs";

export class AuthApi {
  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  getVerifyCode = async (ctx) => {
    const { email, action } = ctx.request.body;

    const user = await this.userRepository.findOne({ where: { email } });

    if (action === "register" && user) {
      ctx.body = {
        message: "auth.email_already_registered",
      };
      ctx.status = 400;
      return;
    }

    if (action === "retrieve password" && !user) {
      ctx.body = {
        message: "auth.email_not_registered_yet",
      };
      ctx.status = 400;
      return;
    }

    const code = await redis.get(`verify_code_${email}`);

    if (!code) {
      const templatePath = path.join(
        process.cwd(),
        "email/templates/verify_code_email.ejs"
      );
      const template = await fs.readFile(templatePath, "utf-8");
      const verifyCode = randomString();
      const html = ejs.render(template, {
        code: verifyCode,
        username: user?.username,
      });

      redis.set(`verify_code_${email}`, verifyCode, "EX", 60 * 5);

      sendMail({
        subject: "验证码 · Jana Dos",
        html,
        to: email,
      });
    }

    ctx.body = {
      message: "auth.verify_code_sending_success",
    };
    ctx.status = 200;
  };

  register = async (ctx) => {
    const { username, password, email, verifyCode } = ctx.request.body;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      ctx.body = {
        message: "auth.email_already_registered",
      };
      ctx.status = 400;
      return;
    }

    const code = await redis.get(`verify_code_${email}`);

    if (!code) {
      ctx.body = {
        message: "auth.verify_code_is_expired",
      };
      ctx.status = 400;
      return;
    }

    if (verifyCode !== code) {
      ctx.body = {
        message: "auth.verify_code_is_incorrect",
      };
      ctx.status = 400;
      return;
    }

    const newUser = this.userRepository.create({
      username,
      password,
      email,
    });

    await this.userRepository.save(newUser);

    ctx.body = {
      data: await new UserSerializer(newUser, ctx).toJSON(),
    };
    ctx.status = 201;
  };

  login = async (ctx) => {
    const { email, password } = ctx.request.body;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      ctx.body = {
        message: "auth.account_does_not_exist",
      };
      ctx.status = 400;
      return;
    }

    if (password !== user.password) {
      ctx.body = {
        message: "auth.username_or_password_is_incorrect",
      };
      ctx.status = 400;
      return;
    }

    ctx.body = {
      data: await new UserSerializer(user, ctx).toJSON(),
    };
    ctx.status = 200;
  };

  resetPassword = async (ctx) => {
    const { email, verifyCode, password } = ctx.request.body;

    ctx.body = {
      message: "API 尚未实现",
    };
    ctx.status = 501;
  };
}
