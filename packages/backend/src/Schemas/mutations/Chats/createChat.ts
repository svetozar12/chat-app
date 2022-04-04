import { GraphQLString, GraphQLID } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";
import User from "../../../models/User.model";
import Invites from "../../../models/Invites.model";

const createChat = {
  type: ChatSchema,
  args: {
    invite_id: { type: GraphQLID },
    user1: { type: GraphQLString },
    user2: { type: GraphQLString },
  },
  async resolve(parent: any, args: { invite_id: string; user1: string; user2: string }) {
    const invite_id = args.invite_id;
    const user1 = args.user1;
    const user2 = args.user2;
    const findInvite = await Invites.findByIdAndUpdate(invite_id, { status: "accepted" }, { new: true });
    const findUser1 = await User.findOne({ username: user1 });
    const findUser2 = await User.findOne({ username: user2 });
    if (!findInvite) return createError(404, `Invited with invite_id: ${invite_id} not found`);
    if (!findUser1) return createError(404, `User ${user1} not found`);
    if (!findUser2) return createError(404, `User ${user2} not found`);

    const chat = await new Chats({
      members: [user1, user2],
    });

    await chat.save();
    return chat;
  },
};

export default createChat;
