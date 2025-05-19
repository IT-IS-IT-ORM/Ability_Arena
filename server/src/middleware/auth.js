import mongoose from "mongoose";

export async function authMiddleware(ctx, next) {
  const authHeader = ctx.request.headers.authorization;

  ctx.isAuthenticated = false;
  ctx.user = null;

  if (!authHeader) {
    await next();
    return;
  }

  const users = mongoose.connection.db.collection("user");
  const user = await users.findOne({ username: authHeader });

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.user = user;
  ctx.isAuthenticated = true;

  await next();
}
