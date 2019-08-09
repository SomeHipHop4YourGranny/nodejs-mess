import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    _owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    members: [
      {
        _member: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    last_mess: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Dialog", schema);
