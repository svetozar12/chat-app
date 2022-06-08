import { GraphQLString } from "graphql";
import deleteUserSchema from "./deleteSchema";
import resource from "../../../api_helper/index";

interface IDeleteUser {
  id: string;
  token: string;
}

const deleteUser = {
  type: deleteUserSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IDeleteUser, context: undefined) {
    const res = await resource.user.delete(args.id, args.token);
    return res.data;
  },
};

export default deleteUser;
