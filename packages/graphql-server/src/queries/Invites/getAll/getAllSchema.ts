import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const InviteObject = new GraphQLObjectType({
  name: "ivnite_object",
  fields: {
    _id: { type: GraphQLString },
    inviter: { type: GraphQLString },
    reciever: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

const InviteSchema = new GraphQLObjectType({
  name: "InviteSchema",
  fields: () => ({
    invites: { type: new GraphQLList(InviteObject) },
  }),
});

export default InviteSchema;
