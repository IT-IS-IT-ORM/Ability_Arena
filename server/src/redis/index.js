import Redis from "ioredis";
// Env
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

export function testRedisConnection() {
  redis
    .ping()
    .then((res) => {
      console.log("✅ Redis 连接成功");
    })
    .catch(() => {
      console.error("❌ Redis 连接失败");
    });
}

export default redis;
