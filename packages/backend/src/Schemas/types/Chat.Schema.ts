import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";
// Construct a schema, using GraphQL schema language

const membersSchema = new GraphQLObjectType({
  name: "ChatMembers",
  fields: () => ({
    _id: { type: GraphQLID },
    members: { type: GraphQLString },
  }),
});

const ChatSchema = new GraphQLObjectType({
  name: "Chat",
  fields: () => ({
    _id: { type: GraphQLID },
    members: { type: new GraphQLList(membersSchema) },
  }),
});

export { ChatSchema };
