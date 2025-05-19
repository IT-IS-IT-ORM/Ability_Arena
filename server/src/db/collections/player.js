import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 24,
  },
  avatarIndex: {
    type: Number,
    default: 0,
    min: 0,
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
});

export default mongoose.model("Player", playerSchema, "player");
