import { GraphQLObjectType, GraphQLSchema } from "graphql";

// queries
import { getUser } from "./queries/getUser";
// mutations
import loginUser from "./mutations/Auth/loginUser";
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser,
  },
});

const Mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    loginUser,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
