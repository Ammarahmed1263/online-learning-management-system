import { Schema, model } from "mongoose";
import logActions from "../utils/logActions.js";

const logSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(logActions),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Log = model("Log", logSchema);

export default Log;
