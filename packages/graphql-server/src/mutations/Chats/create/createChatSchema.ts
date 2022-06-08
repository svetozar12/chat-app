import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
const ChatsSchema = new GraphQLObjectType({
  name: "chatroom",
  fields: {
    _id: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
  },
});

const createChatSchema = new GraphQLObjectType({
  name: "create_chat",
  fields: () => ({
    Message: { type: ChatsSchema },
  }),
});

export default createChatSchema;
