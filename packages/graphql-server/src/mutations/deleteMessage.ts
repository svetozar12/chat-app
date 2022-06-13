import resource from "../api_helper/index";

interface IDeleteMessage {
  message_id: string;
  user_id: string;
  token: string;
}

const deleteMessage = async (args: IDeleteMessage) => {
  const res = await resource.message.delete(args.message_id, args.user_id, args.token);

  return res.data;
};

export default deleteMessage;
