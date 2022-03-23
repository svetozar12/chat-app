import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { update_formValidation } from "../helpers/schema";
import getUser from "./queries/getUser";
import getInvite from "./queries/getInvite";
import createUser from "./mutations/Users/createUser";
import updateUser from "./mutations/Users/updateUser";
import deleteUser from "./mutations/Users/deleteUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser,
    getInvite,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    updateUser,
    deleteUser,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
