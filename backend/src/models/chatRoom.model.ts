import { timeStamp } from "console";
import * as mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    members: [String],
    messages: [
      {
        sender: { type: String, required: true },
        time_stamp: { type: String, min: 2, max: 10, required: true },
        message: { type: String, min: 1, max: 100, required: true },
        seenBy: [String],
      },
    ],
  },
  { timestamps: true },
);

const chatRoom = mongoose.model("chatRoom", chatRoomSchema);
module.exports = chatRoom;
