import { GraphQLObjectType, GraphQLString } from "graphql";

const loginUserSchema = new GraphQLObjectType({
  name: "getLoginUser",
  fields: () => ({
    user_id: { type: GraphQLString },
    Access_token: { type: GraphQLString },
    Refresh_token: { type: GraphQLString },
  }),
});

export default loginUserSchema;
