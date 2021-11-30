import { Schema, model } from "mongoose";

interface IMessage {
  sender: string;
  message?: string;
  seenBy: string[];
}

const messageSchema = new Schema(
  {
    chatInstance: {
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
