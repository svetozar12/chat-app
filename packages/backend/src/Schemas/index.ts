import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import UserObject from "./types/User.Schema";
import { verifyTokens } from "../helpers/jwt_helper";
import User from "../models/User.model";
const ACCESS_TOKEN: any = process.env.JWT_SECRET;
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAuthUser: {
      type: UserObject.UserTokens,
      args: {
        token: { type: GraphQLString },
      },
      async resolve(parent, args: { token: string }) {
        const response = await verifyTokens(args.token, ACCESS_TOKEN);
        if (!response) return { Message: "Bad" };
        return response;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserObject.User,
      args: {
        log: { type: GraphQLString },
      },
      resolve(parent, args) {
        // userData.push({
        //   log: args.log,
        // });
        return args;
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
