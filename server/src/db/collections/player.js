import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 24,
    },
    avatarIndex: {
      type: Number,
      default: 1,
      min: 1,
    },
    gold: {
      type: Number,
      default: 100,
      min: 0,
      max: 100_000_000,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Player", playerSchema, "player");
