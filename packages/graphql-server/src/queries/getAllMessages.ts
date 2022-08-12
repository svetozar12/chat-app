import resource from "../api_helper/index";

interface IMessage {
  user_id: string;
  chat_id: string;
  query: {
    page_size: number;
    page_number: number;
  };
  token: string;
}

const getMessages = async (args: IMessage) => {
  const res = await resource.message.getAll(args.chat_id, args.user_id, args.query, args.token);
  return res.data;
};

export default getMessages;
