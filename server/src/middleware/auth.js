import mongoose from "mongoose";

export async function authMiddleware(ctx, next) {
  const authHeader = ctx.request.headers.authorization;

  ctx.isAuthenticated = false;
  ctx.player = null;

  if (!authHeader) {
    await next();
    return;
  }

  const players = mongoose.connection.db.collection("player");
  const player = await players.findOne({
    _id: new mongoose.Types.ObjectId(authHeader),
  });

  if (!player) {
    ctx.status = 401;
    return;
  }

  ctx.player = player;
  ctx.isAuthenticated = true;

  await next();
}
