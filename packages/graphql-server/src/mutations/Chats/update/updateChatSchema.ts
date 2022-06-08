import { GraphQLObjectType, GraphQLString } from "graphql";

const updateChatSchema = new GraphQLObjectType({
  name: "update_chat",
  fields: () => ({
    Message: { type: GraphQLString },
  }),
});

export default updateChatSchema;
