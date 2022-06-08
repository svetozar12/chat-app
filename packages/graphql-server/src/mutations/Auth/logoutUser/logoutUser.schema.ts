import { GraphQLObjectType, GraphQLString } from "graphql";

const logoutUserSchema = new GraphQLObjectType({
  name: "logoutUserSchema",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

export default logoutUserSchema;
