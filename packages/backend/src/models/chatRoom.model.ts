import { Schema, model } from "mongoose";

export interface ChatRoom {
  members: string[];
}

const chatRoomSchema = new Schema<ChatRoom>({
  members: [String],
});

const chatRoom = model<ChatRoom>("chatRoom", chatRoomSchema);
export default chatRoom;
