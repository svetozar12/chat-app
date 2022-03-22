import { UserSchema } from "../types/User.Schema";
import { GraphQLString } from "graphql";
import User from "../../models/User.model";

const getUser = {
  type: UserSchema,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parent: any, args: { username: string }) {
    const response = await User.findOne({ username: args.username });

    if (!response) {
      throw new Error(`User ${args.username} not found`);
    }
    return response;
  },
};

export default getUser;
