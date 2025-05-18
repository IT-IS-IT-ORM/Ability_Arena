// Env
import dotenv from "dotenv";
// Koa
import Koa from "koa";
import koaCors from "@koa/cors";
import { koaBody } from "koa-body";
import koaLogger from "koa-logger";
// Middleware
import { authMiddleware } from "#root/middleware/auth.js";
import { koaBodyConfig } from "#root/middleware/koaBody.js";
// Routes
import { apiRouter, mediaRouter } from "#router/index.js";
import "#router/init.js";
// Utils
import { getLocalIP, ensureMediaDirectories } from "#utils/index.js";
// Database
// Redis
import { testRedisConnection } from "#root/redis/index.js";

// 初始化环境变量
dotenv.config();

ensureMediaDirectories();

// 初始化 Koa 应用
const app = new Koa();

app.use(koaCors());
app.use(koaBody(koaBodyConfig));
app.use(koaLogger());
app.use(authMiddleware);

// 初始化数据库连接
AppDataSource.initialize()
  .then(() => {
    console.log("✅ 数据库连接初始化成功");
  })
  .catch((error) => {
    console.error("❌ 数据库连接初始化失败:", error);
  });

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(mediaRouter.routes());
app.use(mediaRouter.allowedMethods());

const appPort = process.env.APP_PORT;

testRedisConnection();

app.listen(appPort, "0.0.0.0", () => {
  console.log("--------------------------------");
  console.log("🚀 服务器成功启动!");
  for (const ip of getLocalIP()) {
    console.log(`http://${ip}:${appPort}`);
  }
  console.log("--------------------------------");
});
