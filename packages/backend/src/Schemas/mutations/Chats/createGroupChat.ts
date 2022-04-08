import { GraphQLString, GraphQLList } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";
import User from "../../../models/User.model";
import { isAuth } from "../../permission";

const createGroupChat = {
  type: ChatSchema,
  args: {
    usersData: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(parent: any, args: { usersData: string[] }, context: { user: string }) {
    isAuth(context.user);
    const usersData = args.usersData;
    for (const user of usersData) {
      if ((await User.findOne({ username: user })) === null) {
        return createError(404, `${user} not found`);
      }
    }
    const chat = await new Chats({
      members: usersData,
    });

    await chat.save();
    return chat;
  },
};

export default createGroupChat;
