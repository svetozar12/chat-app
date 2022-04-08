import { GraphQLList, GraphQLInt, GraphQLID } from "graphql";
import Messages from "../../../models/Message.model";
import * as createError from "http-errors";
import { MessageSchema } from "../../types/Message.Schema";
import { isAuth } from "../../permission";

const getMessages = {
  type: new GraphQLList(MessageSchema),
  args: {
    page_size: { type: GraphQLInt },
    page_number: { type: GraphQLInt },
    chat_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: { page_size: number; page_number: number; chat_id: string }, context: { user: string }) {
    isAuth(context.user);
    const page_size = args.page_size;
    const page_number = args.page_number;
    const chat_id = args.chat_id;
    const messages = await Messages.find({ chatInstance: chat_id })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: "desc" });
    if (messages.length <= 0 || !messages) return createError(404, "You don't have messages.");
    const reversedArr = messages.reverse();
    return reversedArr;
  },
};

export default getMessages;
