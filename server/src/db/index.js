import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db = null;

export async function getDB() {
  if (!db) {
    try {
      db = await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.log("❌ 数据库连接失败:", error);
    }
  }

  return db;
}

export function initCollections() {}
