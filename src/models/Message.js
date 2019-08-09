import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    text: {
      type: String,
      require: true,
    },
    _dialog: {
      type: Schema.Types.ObjectId,
      ref: "Dialog",
      require: true,
    },
    _sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    readed: {
      type: Boolean,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", schema);
