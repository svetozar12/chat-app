import * as mongoose from "mongoose";

interface ChatRoom {
  members: string[];
}

const chatRoomSchema = new mongoose.Schema<ChatRoom>({
  members: [String],
});

const chatRoom = mongoose.model<ChatRoom>("chatRoom", chatRoomSchema);
export default chatRoom;
