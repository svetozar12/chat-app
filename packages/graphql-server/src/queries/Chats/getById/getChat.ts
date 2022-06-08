import { GraphQLString } from "graphql";
import getChat from "./getChatSchema";
import resource from "../../../api_helper/index";

interface IChat {
  user_id: string;
  chat_id: string;
  token: string;
}

const getChatById = {
  type: getChat,
  args: {
    chat_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IChat, context: undefined) {
    const res = await resource.chats.getById(args.chat_id, args.user_id, args.token);
    console.log(res.data);

    return res.data;
  },
};

export default getChatById;
