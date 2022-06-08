import { GraphQLInputObjectType, GraphQLString } from "graphql";
import getChat from "./createChatSchema";
import resource from "../../../api_helper/index";

interface ICreateChat {
  chat: {
    user_id: string;
    invite_id: string;
    user1: string;
    user2: string;
  };
  token: string;
}

const UserType = new GraphQLInputObjectType({
  name: "chatObject__",
  fields: {
    user_id: { type: GraphQLString },
    invite_id: { type: GraphQLString },
    user1: { type: GraphQLString },
    user2: { type: GraphQLString },
  },
});

const createChat = {
  type: getChat,
  args: {
    chat: { type: UserType },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: ICreateChat, context: undefined) {
    const res = await resource.chats.create(args.chat, args.token);
    console.log(res.data);

    return res.data;
  },
};

export default createChat;
