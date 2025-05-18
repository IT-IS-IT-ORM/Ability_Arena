import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 24,
  },
  password: {
    type: String,
    required: true,
    maxLength: 254,
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
});

const User = mongoose.model("User", userSchema);

export default User;
