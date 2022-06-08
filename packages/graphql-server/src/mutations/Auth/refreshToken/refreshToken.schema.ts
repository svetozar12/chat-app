import { GraphQLObjectType, GraphQLString } from "graphql";

const refreshTokenSchema = new GraphQLObjectType({
  name: "refreshToken",
  fields: () => ({
    user_id: { type: GraphQLString },
    Access_token: { type: GraphQLString },
    Refresh_token: { type: GraphQLString },
  }),
});

export default refreshTokenSchema;
