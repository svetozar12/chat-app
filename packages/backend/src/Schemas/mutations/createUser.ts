import { UserSchema, genderSchema } from "../types/User.Schema";
import { registerValidation } from "../../helpers/schema";
import User from "../../models/User.model";
import Chats from "../../models/chatRoom.model";
import * as createError from "http-errors";
import { GraphQLString } from "graphql";

const createUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: {
      type: genderSchema,
    },
  },
  async resolve(parent: any, args: { username: string; password: string; email: string; gender: string }) {
    const { error } = registerValidation(args);
    if (error) return createError(400, error.message);
    const response = await User.findOne({ username: args.username });
    if (response) {
      return createError(400, `${args.username} already exist`);
    }

    const user = new User({
      type: "POST",
      username: args.username,
      password: args.password,
      email: args.email,
      userAvatar: "",
      gender: args.gender,
    });

    const chat = new Chats({
      members: args.username,
    });

    user.save();
    chat.save();

    return args;
  },
};

export default createUser;