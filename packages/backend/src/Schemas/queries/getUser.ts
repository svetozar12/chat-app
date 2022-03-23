import { UserSchema } from "../types/User.Schema";
import { GraphQLString } from "graphql";
import User from "../../models/User.model";
import * as createError from "http-errors";

const getUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parent: any, args: { username: string }) {
    const response = await User.findOne({ username: args.username });

    if (!response) {
      return createError(404, `User ${args.username} not found`);
    }
    return response;
  },
};

export default getUser;
