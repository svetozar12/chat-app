import { GraphQLString } from "graphql";
import deleteChatSchema from "./deleteChatSchema";
import resource from "../../../api_helper/index";

interface IDeleteChat {
  user_id: string;
  chat_id: string;
  token: string;
}

const deleteChat = {
  type: deleteChatSchema,
  args: {
    user_id: { type: GraphQLString },
    chat_id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IDeleteChat, context: undefined) {
    const res = await resource.chats.delete(args.chat_id, args.user_id, args.token);
    console.log(res.data);

    return res.data;
  },
};

export default deleteChat;
