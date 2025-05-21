// Env
import dotenv from "dotenv";
// Koa
import Koa from "koa";
import koaCors from "@koa/cors";
import { koaBody } from "koa-body";
import koaLogger from "koa-logger";
// Socket
import http from "http";
import { initSocket } from "#src/socket/index.js";
// Middleware
import { authMiddleware } from "#src/middleware/auth.js";
import { koaBodyConfig } from "#src/middleware/koaBody.js";
// Routes
import { apiRouter, mediaRouter } from "#src/router/index.js";
import "#src/router/init.js";
// Utils
import { getLocalIP, ensureMediaDirectories } from "#src/utils/index.js";
// Redis
import { testRedisConnection } from "#src/redis/index.js";
// DB
import { initDatabase } from "#src/db/index.js";

// 初始化环境变量
dotenv.config();

console.log("--------------------------------");
ensureMediaDirectories();

// 初始化 Koa 应用
const app = new Koa();

app.use(koaCors());
app.use(koaBody(koaBodyConfig));
app.use(koaLogger());
app.use(authMiddleware);

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(mediaRouter.routes());
app.use(mediaRouter.allowedMethods());

const appPort = process.env.APP_PORT;

const server = http.createServer(app.callback());

// 初始化 Socket.IO
initSocket(server);

testRedisConnection();
await initDatabase();

server.listen(appPort, "0.0.0.0", () => {
  console.log("--------------------------------");
  console.log("🚀 服务器成功启动!");
  console.log("📡 WebSocket 服务已启动");
  for (const ip of getLocalIP()) {
    console.log(`http://${ip}:${appPort}`);
    console.log(`ws://${ip}:${appPort}`);
  }
  console.log("--------------------------------");
});
