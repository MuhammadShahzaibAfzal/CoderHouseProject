import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["open", "social", "private"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    speakers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema, "rooms");

export default RoomModel;
