import { UserSchema } from "../types/User.Schema";
import { GraphQLString } from "graphql";
import User from "../../models/User.model";
import Chats from "../../models/chatRoom.model";
import Invites from "../../models/Invites.model";
import * as createError from "http-errors";

const deleteUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parents: any, args: { username: string }) {
    const user = await User.findOne({ username: args.username }).exec();
    if (!user) return createError(404, `${args.username} not found`);
    await User.deleteOne({ username: args.username }).exec();
    await Invites.deleteMany({
      reciever: args.username,
    }).exec();
    await Invites.deleteMany({
      inviter: args.username,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [args.username] },
    }).exec();
    return args;
  },
};

export default deleteUser;
