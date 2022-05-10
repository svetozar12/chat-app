import { GraphQLObjectType, GraphQLSchema } from "graphql";

// queries
import { AuthLogin } from "./queries/Auth";
import { AuthUser } from "./queries/Auth";
import { AuthRefresh } from "./queries/Auth";
import { GetChatRooms } from "./queries/ChatRooms";
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    AuthLogin,
    AuthUser,
    // AuthRefresh,
    GetChatRooms,
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     createUser,
//   },
// });

const Schema = new GraphQLSchema({ query: RootQuery });
export default Schema;
