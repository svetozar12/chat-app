import { UserSchema } from "../../types/User.Schema";
import User from "../../../models/User.model";
import * as createError from "http-errors";
import { isAuth } from "../../permission";
import { GraphQLString } from "graphql";

const getUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parent: any, args: { username: string }, context: { user: string }) {
    isAuth(context.user);
    const response = await User.findOne({ username: context.user });
    if (!response) {
      return createError(404, `User ${context.user} not found`);
    }
    return response;
  },
};

export default getUser;
