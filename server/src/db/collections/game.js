import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  // Redis 键
  roomId: {
    type: String,
    required: true,
  },
  // 玩家列表
  players: {
    type: [String],
    required: true,
  },
  // 游戏状态
  status: {
    type: String,
    default: "playing",
    enum: ["playing", "ended"],
  },
  // 开始时间
  startAt: {
    type: Date,
    default: Date.now,
  },
  // 结束时间
  endAt: {
    type: Date,
  },
  // 操作列表
  actions: {
    type: [Object],
    default: [],
  },
});

export default mongoose.model("Game", gameSchema, "game");
