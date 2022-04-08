import { GraphQLID } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";
import { isAuth } from "../../permission";

const deleteChat = {
  type: ChatSchema,
  args: {
    chat_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: { chat_id: string }, context: { user: string }) {
    isAuth(context.user);
    const chat_id = args.chat_id;
    const chat_room = await Chats.findOne({ _id: chat_id }).exec();
    if (!chat_room) return createError(404, `Chat room with id: ${chat_id} not found`);
    await Chats.deleteOne({ _id: chat_id });
    return `Chat_room ${chat_id} is deleted`;
  },
};

export default deleteChat;
