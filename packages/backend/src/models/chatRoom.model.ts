import { Schema, model } from "mongoose";

export interface ChatRoom {
  members: Schema.Types.ObjectId[];
}

const chatRoomSchema = new Schema<ChatRoom>({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const chatRoom = model<ChatRoom>("chatRoom", chatRoomSchema);
export default chatRoom;
