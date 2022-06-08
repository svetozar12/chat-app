import { GraphQLInputObjectType, GraphQLString } from "graphql";
import updateUserSchema from "./updateSchema";
import resource from "../../../api_helper/index";

interface IUpdateUser {
  id: string;
  token: string;
  user: {
    username: string;
    email: string;
    gender: "Male" | "Female" | "Other";
  };
}

const UserType = new GraphQLInputObjectType({
  name: "userInput",
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
  },
});

const updateUser = {
  type: updateUserSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    user: { type: UserType },
  },
  async resolve(parent: undefined, args: IUpdateUser, context: undefined) {
    const res = await resource.user.update(args.user, args.id, args.token);
    return res.data;
  },
};

export default updateUser;
