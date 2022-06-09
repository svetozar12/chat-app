import resource from "../api_helper";

interface IChat {
  user_id: string;
  chat_id: string;
  token: string;
}

const getChatById = async (parent: undefined, args: IChat, context: undefined) => {
  const res = await resource.chats.getById(args.chat_id, args.user_id, args.token);

  return res.data;
};

export default getChatById;
