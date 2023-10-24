import mongoose from "mongoose";

const refreshSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const RefreshModel = mongoose.model("Refresh", refreshSchema, "tokens");

export default RefreshModel;
