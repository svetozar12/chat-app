import resource from "../api_helper/index";

interface IDeleteChat {
  user_id: string;
  chat_id: string;
  token: string;
}

const deleteChat = async (args: IDeleteChat) => {
  const res = await resource.chats.delete(args.chat_id, args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default deleteChat;
