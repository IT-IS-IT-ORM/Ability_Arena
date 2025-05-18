import mongoose from "mongoose";
import dotenv from "dotenv";
import { createMomoUsers } from "#src/utils/index.js";

dotenv.config();

export async function initDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("❌ 数据库连接失败:", error);
    return;
  }

  const momoUserCount = 100;
  try {
    await createMomoUsers(momoUserCount);
  } catch (error) {
    console.log("❌ 创建用户失败:", error);
  }
  console.log("--------------------------------");
  console.log(`🎉 已创建 ${momoUserCount} 个用户!`);
  console.log(`用户名: momo1 ~ momo${momoUserCount}`);
}
