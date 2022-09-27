import resource from "../api_helper/index";

interface IUpdateChat {
  user_id: string;
  chat_id: string;
  username?: string;
  usersData?: string[];
  token: string;
}

const updateChat = async (args: IUpdateChat) => {
  const res = await resource.chats.update(args.chat_id, args.username as string, args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default updateChat;
