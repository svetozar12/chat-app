import { GraphQLObjectType, GraphQLString } from "graphql";

const getUserSchema = new GraphQLObjectType({
  name: "getUser",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    userAvatar: { type: GraphQLString },
  }),
});

export default getUserSchema;
