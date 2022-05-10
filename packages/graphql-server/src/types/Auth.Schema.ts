import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const AuthSchema = new GraphQLObjectType({
  name: "AuthLogin",
  fields: () => ({
    Access_token: { type: GraphQLString },
    Refresh_token: { type: GraphQLString },
  }),
});

const AuthSchemaRefresh = new GraphQLObjectType({
  name: "AuthRefresh",
  fields: () => ({
    username: { type: GraphQLString },
    Access_token: { type: GraphQLString },
    Refresh_token: { type: GraphQLString },
  }),
});

const AuthSchemaUser = new GraphQLObjectType({
  name: "AuthUser",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    iat: { type: GraphQLInt },
    exp: { type: GraphQLInt },
  }),
});

export { AuthSchema, AuthSchemaRefresh, AuthSchemaUser };
