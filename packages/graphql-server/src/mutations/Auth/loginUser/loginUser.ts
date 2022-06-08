import { GraphQLString } from "graphql";
import getUserSchema from "./loginUser.schema";
import resource from "../../../api_helper/index";

interface ILoginUser {
  username: string;
  password: string;
}

const User = {
  type: getUserSchema,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: ILoginUser, context: undefined) {
    const res = await resource.auth.login(args);

    return res.data;
  },
};

export default User;
