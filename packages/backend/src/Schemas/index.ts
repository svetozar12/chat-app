import { GraphQLObjectType, GraphQLSchema } from "graphql";

// queries
import getUser from "./queries/Users/getUser";
import getInvite from "./queries/Invites/getInvite";
import getChats from "./queries/Chats/getChats";
import getMessages from "./queries/Messages/getMessages";
// mutations
// create
import createUser from "./mutations/Users/createUser";
import createInvite from "./mutations/Invites/createInvite";
import createChat from "./mutations/Chats/createChat";
import createGroupChat from "./mutations/Chats/createGroupChat";
import createMessage from "./mutations/Messages/CreateMessage";
// update
import updateMessage from "./mutations/Messages/updateMessage";
import updateInvite from "./mutations/Invites/updateInvite";
import updateUser from "./mutations/Users/updateUser";
import updateChat from "./mutations/Chats/updateChat";
// delete
import deleteUser from "./mutations/Users/deleteUser";
import deleteChat from "./mutations/Chats/deleteChat";
import deleteMessage from "./mutations/Messages/deleteMessage";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser,
    getInvite,
    getChats,
    getMessages,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    createChat,
    createInvite,
    createGroupChat,
    createMessage,
    updateMessage,
    updateUser,
    updateInvite,
    updateChat,
    deleteUser,
    deleteChat,
    deleteMessage,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
