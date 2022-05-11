import { GraphQLObjectType, GraphQLSchema } from "graphql";

// queries
import { AuthUser } from "./queries/Auth";
import { GetChatRooms } from "./queries/ChatRooms";
import { GetChatRoom } from "./queries/ChatRooms";
// mutations
import { AuthLogin } from "./mutations/Auth";
import { AuthRefresh } from "./mutations/Auth";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    AuthUser,
    GetChatRooms,
    GetChatRoom,
  },
});

const Mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    AuthLogin,
    // AuthRefresh, doesnt work have to fix it in the rest api(the token signing is causing some problems)
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
