import { GraphQLInputObjectType, GraphQLString } from "graphql";
import createUserSchema from "./createSchema";
import resource from "../../../api_helper/index";

interface ICreateUser {
  user: {
    username: string;
    password: string;
    email: string;
    gender: "Male" | "Female" | "Other";
  };
}

const UserType = new GraphQLInputObjectType({
  name: "userObject",
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
  },
});

const createUser = {
  type: createUserSchema,
  args: {
    user: { type: UserType },
  },
  async resolve(parent: undefined, args: ICreateUser, context: undefined) {
    const res = await resource.user.create(args.user);
    return res.data;
  },
};

export default createUser;
