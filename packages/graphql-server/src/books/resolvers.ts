import { books } from "./Book";

const Books = {};

const BooksResolver = {
  Query: {
    books(parent: undefined, args: { title: string }, infoargs: undefined) {
      return books.find((user) => user.title === args.title);
    },
  },
};

export default BooksResolver;
