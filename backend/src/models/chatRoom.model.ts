import * as mongoose from "mongoose";
interface ChatRoom {
  members: string[];
  messages: IMessage[];
}

interface IMessage {
  sender: string;
  message?: string;
  seenBy: string[];
}

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    message: { type: String, min: 1, max: 100, required: true },
    seenBy: [String],
  },
  { timestamps: true },
);

const chatRoomSchema = new mongoose.Schema<ChatRoom>({
  members: [String],
  messages: [
    {
      type: messageSchema,
    },
  ],
});

const chatRoom = mongoose.model<ChatRoom>("chatRoom", chatRoomSchema);
export const Message = mongoose.model<IMessage>("messages", messageSchema);
export default chatRoom;
