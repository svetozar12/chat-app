import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";

const getChats = {
  type: new GraphQLList(ChatSchema),
  args: {
    user_id: { type: GraphQLID, describe: "Id of the chat-room" },
  },
  async resolve(parent: any, args: { user_id: string }) {
    const user_id = args.user_id;
    const chat_rooms = await Chats.findOne({ _id: user_id }).exec();
    if (!chat_rooms) return createError(404, `Chat room doesn't exist`);
    return chat_rooms;
  },
};

export default getChats;
