import { GraphQLString, GraphQLList } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";

const getChats = {
  type: new GraphQLList(ChatSchema),
  args: {
    username: { type: GraphQLString, describe: "Name of the user" },
  },
  async resolve(parent: any, args: { username: string }) {
    const name = args.username;
    const contacts = await Chats.find({ members: name }).exec();
    if (contacts.length <= 0) return createError(404, `User ${args.username} doesn't have chat rooms`);
    return contacts;
  },
};

export default getChats;
