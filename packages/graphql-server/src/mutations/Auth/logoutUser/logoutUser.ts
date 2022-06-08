import { GraphQLString } from "graphql";
import getUserSchema from "./logoutUser.schema";
import resource from "../../../api_helper/index";

interface ILogoutUser {
  id: string;
  token: string;
}

const logoutUser = {
  type: getUserSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: ILogoutUser, context: undefined) {
    const res = await resource.auth.logout(args.id, args.token);
    console.log(res);

    return res.data;
  },
};

export default logoutUser;
