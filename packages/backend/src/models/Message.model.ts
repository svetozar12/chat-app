import { Schema, model } from "mongoose";

interface IMessage {
  user_id: Schema.Types.ObjectId;
  chat_id: Schema.Types.ObjectId;
  sender: string;
  message?: string;
  seenBy: string[];
}

const messageSchema = new Schema<IMessage>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat_id: {
      type: Schema.Types.ObjectId,
      ref: "chatRoom",
      required: true,
    },
    sender: { type: String, required: true },
    message: { type: String, min: 1, max: 100, required: true },
    seenBy: [String],
  },
  { timestamps: true },
);

const Messages = model<IMessage>("messages", messageSchema);
export default Messages;
