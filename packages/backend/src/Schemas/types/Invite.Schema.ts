import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLEnumType } from "graphql";
// Construct a schema, using GraphQL schema language

const statusSchema = new GraphQLEnumType({
  name: "status",
  values: {
    recieved: { value: "recieved" },
    accepted: { value: "accepted" },
    declined: { value: "declined" },
  },
});

const InviteSchema = new GraphQLObjectType({
  name: "Invite",
  fields: () => ({
    _id: { type: GraphQLID },
    inviter: { type: GraphQLString, description: "User that sent the invite" },
    reciever: { type: GraphQLString, description: "User that recieved the invite" },
    status: {
      type: statusSchema,
      description: "Status of the invite",
    },
  }),
});

export { InviteSchema, statusSchema };
