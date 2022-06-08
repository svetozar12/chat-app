import { GraphQLList, GraphQLString } from "graphql";
import updateChatSchema from "./updateChatSchema";
import resource from "../../../api_helper/index";

interface IUpdateChat {
  user_id: string;
  chat_id: string;
  username?: string;
  usersData?: string[];
  token: string;
}

const updateChat = {
  type: updateChatSchema,
  args: {
    user_id: { type: GraphQLString },
    chat_id: { type: GraphQLString },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    usersData: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(parent: undefined, args: IUpdateChat, context: undefined) {
    const res = await resource.chats.update(args.chat_id, args.username as string, args.user_id, args.token);
    console.log(res.data);

    return res.data;
  },
};

export default updateChat;
