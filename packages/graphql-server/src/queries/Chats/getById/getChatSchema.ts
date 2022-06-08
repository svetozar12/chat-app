import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
const ChatsSchema = new GraphQLObjectType({
  name: "chatObject_",
  fields: {
    _id: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
  },
});

const getChat = new GraphQLObjectType({
  name: "get_chat",
  fields: () => ({
    data: { type: ChatsSchema },
  }),
});

export default getChat;
