import { GraphQLString } from "graphql";
import getUserSchema from "./loginUser.schema";
import api from "../../../api_helper";

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
    const res = await api.post("/auth/login", {
      username: args.username,
      password: args.password,
    });

    console.log(res.data);

    if (res.status !== 200) throw Error("bad");

    return res.data.user;
  },
};

export default User;
