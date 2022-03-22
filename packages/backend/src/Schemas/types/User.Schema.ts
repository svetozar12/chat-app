import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
// Construct a schema, using GraphQL schema language
const UserSchema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    userAvatar: { type: GraphQLString },
  }),
});

export default UserSchema;
