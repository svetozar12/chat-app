import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const MessageObject = new GraphQLObjectType({
  name: "message_object",
  fields: {
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    chat_id: { type: GraphQLString },
    sender: { type: GraphQLString },
    message: { type: GraphQLString },
    seenBy: { type: new GraphQLList(GraphQLString) },
  },
});

const MessageSchema = new GraphQLObjectType({
  name: "MessageSchema",
  fields: () => ({
    message: { type: new GraphQLList(MessageObject) },
  }),
});

export default MessageSchema;
