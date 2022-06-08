import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const ChatsSchema = new GraphQLObjectType({
  name: "chatObject",
  fields: {
    _id: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
  },
});

const getAllSchema = new GraphQLObjectType({
  name: "getAllChats",
  fields: () => ({
    contacts: { type: new GraphQLList(ChatsSchema) },
  }),
});

export default getAllSchema;
