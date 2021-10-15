import * as mongoose from "mongoose";
interface ChatRoom {
  members: string[];
  messages: {
    sender: string;
    time_stamp: string;
    message?: string;
    seenBy: string[];
  }[];
}
const chatRoomSchema = new mongoose.Schema<ChatRoom>({
  members: [String],
  messages: [
    {
      sender: { type: String, required: true },
      time_stamp: { type: String, min: 2, max: 10, required: true },
      message: { type: String, min: 1, max: 100, required: true },
      seenBy: [String],
    },
  ],
});

const chatRoom = mongoose.model<ChatRoom>("chatRoom", chatRoomSchema);

export default chatRoom;
