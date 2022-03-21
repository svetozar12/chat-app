import { GraphQLObjectType, GraphQLString } from "graphql";
// Construct a schema, using GraphQL schema language
const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const UserTokens = new GraphQLObjectType({
  name: "UserTokens",
  fields: () => ({
    Access_token: { type: GraphQLString },
    Refresh_token: { type: GraphQLString },
  }),
});

const UserObject = {
  User,
  UserTokens,
};

export default UserObject;
