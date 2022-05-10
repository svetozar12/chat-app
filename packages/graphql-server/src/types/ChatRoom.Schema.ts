import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const SignleRoom = new GraphQLObjectType({
  name: "Members",
  fields: () => ({
    _id: { type: GraphQLID },
    members: { type: new GraphQLList(GraphQLString) },
  }),
});

const ChatRooms = new GraphQLObjectType({
  name: "ChatRoom",
  fields: () => ({
    message: {
      type: GraphQLString,
    },
    contacts: { type: new GraphQLList(SignleRoom) },
  }),
});

export { ChatRooms, SignleRoom };
