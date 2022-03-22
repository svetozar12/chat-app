import { update_formValidation } from "../../helpers/schema";
import { UserSchema, genderSchema } from "../types/User.Schema";
import { GraphQLString } from "graphql";
import upload from "../../helpers/image_helper";
import User from "../../models/User.model";
import * as createError from "http-errors";

const updateUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: {
      type: genderSchema,
    },
    userAvatar: { type: GraphQLString },
  },
  async resolve(parents: any, args: { username: string; email: string; gender: string; userAvatar: string }) {
    const { error } = update_formValidation(args);
    if (error) return createError(400, error.message);
    const users = await User.findOne({ username: args.username }).exec();
    if (!users) return createError(404, `${args.username} doesn't exist`);
    args.userAvatar && upload.single("userAvatar");
    await User.findByIdAndUpdate(users._id, {
      email: args.email ? args.email : users.email,
      gender: args.gender ? args.gender : users.gender,
      userAvatar: args.email ? args.userAvatar : users.userAvatar,
    });
    const after_update = await User.findOne({ username: args.username }).exec();

    return after_update;
  },
};

export default updateUser;
