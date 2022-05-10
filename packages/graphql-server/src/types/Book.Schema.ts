import { GraphQLObjectType, GraphQLString } from "graphql";

const BookSchema = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    author: { type: GraphQLString },
    book: { type: GraphQLString },
  }),
});

export { BookSchema };
