import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    login: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://source.unsplash.com/random",
    },
    last_seen: {
      type: Date,
      default: Date(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", schema);
