import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import MessageSchema from "./getAllSchema";
import resource from "../../api_helper/index";
import { GraphQLObjectType } from "graphql";

interface IMessage {
  user_id: string;
  chat_id: string;
  query: {
    page_size: number;
    page_number: number;
  };
  token: string;
}

const QueryType = new GraphQLInputObjectType({
  name: "pagination_query",
  fields: () => ({
    page_size: { type: GraphQLInt },
    page_number: { type: GraphQLInt },
  }),
});

const getMessages = {
  type: MessageSchema,
  args: {
    user_id: { type: GraphQLString },
    chat_id: { type: GraphQLString },
    query: { type: QueryType },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IMessage) {
    const res = await resource.message.getAll(args.chat_id, args.user_id, args.query, args.token);
    return res.data;
  },
};

export default getMessages;
