import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { update_formValidation } from "../helpers/schema";
import getUser from "./queries/getUser";
import createUser from "./mutations/createUser";
import updateUser from "./mutations/updateUser";
import deleteUser from "./mutations/deleteUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser,
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
