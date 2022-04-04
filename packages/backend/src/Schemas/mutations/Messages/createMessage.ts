import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import Messages from "../../../models/Message.model";
import * as createError from "http-errors";
import { MessageSchema } from "../../types/Message.Schema";
const createMessage = {
  type: new GraphQLList(MessageSchema),
  args: {
    sender: { type: GraphQLString },
    message: { type: GraphQLString },
    chat_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: { sender: string; message: string; chat_id: string }) {
    const chat_id = args.chat_id;
    const sender = args.sender;
    const message = args.message;

    const messages = await new Messages({
      chatInstance: chat_id,
      sender: sender,
      message: message,
      seenBy: [],
    });
    if (!message) return createError(400, message);
    await messages.save();
    return messages;
  },
};

export default createMessage;
