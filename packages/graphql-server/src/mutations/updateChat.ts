import resource from "../api_helper/index";

interface IUpdateChat {
  user_id: string;
  chat_id: string;
  username?: string;
  usersData?: string[];
  token: string;
}

const updateChat = async (parent: undefined, args: IUpdateChat, context: undefined) => {
  const res = await resource.chats.update(args.chat_id, args.username as string, args.user_id, args.token);
  return res.data;
};

export default updateChat;
