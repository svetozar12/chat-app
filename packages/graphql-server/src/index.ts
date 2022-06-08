import { GraphQLObjectType, GraphQLSchema } from "graphql";

// queries
import { getUser } from "./queries/User/getUser";
import getAll from "./queries/Chats/getAll";
import getChat from "./queries/Chats/getById";
import getInvites from "./queries/Invites/getAll";
import getMessages from "./queries/Messages/getAll";
// mutations
// POST
import createUser from "./mutations/User/create";
import createChat from "./mutations/Chats/create";
import loginUser from "./mutations/Auth/loginUser";
import logoutUser from "./mutations/Auth/logoutUser";
import refreshToken from "./mutations/Auth/refreshToken";
// UPDATE
import updateChat from "./mutations/Chats/update/updateChat";
import updateUser from "./mutations/User/update";
// DELETE
import deleteUser from "./mutations/User/delete";
import deleteChat from "./mutations/Chats/delete";

const { byInviter, byReciever } = getInvites;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getChat,
    getAll,
    getUser,
    byInviter,
    byReciever,
    getMessages,
  },
});

const Mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    loginUser,
    // logout now working
    logoutUser,
    createUser,
    createChat,
    refreshToken,
    updateUser,
    // updatechat now working
    updateChat,
    deleteUser,
    deleteChat,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
