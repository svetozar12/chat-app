import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";

const MessageSchema = new GraphQLObjectType({
  name: "message",
  fields: () => ({
    _id: { type: GraphQLID },
    chat_id: { type: GraphQLID },
    sender: { type: GraphQLString },
    message: { type: GraphQLString },
    seenBy: { type: new GraphQLList(GraphQLString) },
  }),
});

export { MessageSchema };
