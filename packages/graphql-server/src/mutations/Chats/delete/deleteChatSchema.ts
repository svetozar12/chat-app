import { GraphQLObjectType, GraphQLString } from "graphql";

const deleteChatSchema = new GraphQLObjectType({
  name: "delete_chat",
  fields: () => ({
    Message: { type: GraphQLString },
  }),
});

export default deleteChatSchema;
