import { GraphQLString } from "graphql";
import getUserSchema from "./User.schema";
import api from "../../utils/axiosInstance";

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
  async resolve(parent: undefined, args: IUser, context: undefined) {
    const res = await api.get(`/users/${args.id}`, {
      headers: { Authorization: `Bearer ${args.token}` },
    });

    if (res.status !== 200) throw Error("bad");

    return res.data.user;
  },
};

export default User;
