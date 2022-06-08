import { GraphQLString } from "graphql";
import getUserSchema from "./User.schema";
import resource from "../../../api_helper/index";

interface IUser {
  id: string;
  token: string;
}

const User = {
  type: getUserSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IUser) {
    const res = await resource.user.getById(args.id, args.token);

    return res.data.user;
  },
};

export default User;
