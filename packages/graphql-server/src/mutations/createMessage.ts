import resource from "../api_helper/index";

interface ICreateMessage {
  chat_id: string;
  user_id: string;
  message: string;
  token: string;
}

const createMessage = async (args: ICreateMessage) => {
  const res = await resource.message.create(args.chat_id, args.user_id, args.message, args.token);
  return res.data;
};

export default createMessage;
