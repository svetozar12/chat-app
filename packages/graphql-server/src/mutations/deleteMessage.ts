import resource from "../api_helper/index";

interface IDeleteMessage {
  chat_id: string;
  user_id: string;
  token: string;
}

const deleteMessage = async (args: IDeleteMessage) => {
  const res = await resource.chats.delete(args.chat_id, args.user_id, args.token);

  return res.data;
};

export default deleteMessage;
