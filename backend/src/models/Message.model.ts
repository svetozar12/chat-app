import * as mongoose from "mongoose";

interface IMessage {
  sender: string;
  message?: string;
  seenBy: string[];
}

const messageSchema = new mongoose.Schema(
  {
    chatInstance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatRoom",
      required: true,
    },
    sender: { type: String, required: true },
    message: { type: String, min: 1, max: 100, required: true },
    seenBy: [String],
  },
  { timestamps: true },
);

const Messages = mongoose.model<IMessage>("messages", messageSchema);
export default Messages;
