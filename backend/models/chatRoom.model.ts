import * as mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  members: {
    type: [String],
    required: true,
  },
  messages: {
    type: [String],
    required: true,
  },
});

const chatRoom = mongoose.model("chatRoom", chatRoomSchema);
module.exports = chatRoom;
