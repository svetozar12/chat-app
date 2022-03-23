import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { update_formValidation } from "../helpers/schema";
import getUser from "./queries/getUser";
import getInvite from "./queries/getInvite";
import createUser from "./mutations/Users/createUser";
import createInvite from "./mutations/Invites/createInvite";
import updateInvite from "./mutations/Invites/updateInvite";
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
    createInvite,
    updateUser,
    updateInvite,
    deleteUser,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
