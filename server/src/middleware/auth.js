import { AppDataSource } from "#root/typeorm.config.js";
import { UserEntity } from "#root/apps/user/entity.js";

export async function authMiddleware(ctx, next) {
  const authHeader = ctx.request.headers.authorization;

  ctx.isAuthenticated = false;
  ctx.user = null;

  if (!authHeader) {
    await next();
    return;
  }

  const userRepository = AppDataSource.getRepository(UserEntity);
  const user = await userRepository.findOne({ where: { id: authHeader } });

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.user = user;
  ctx.isAuthenticated = true;

  await next();
}
