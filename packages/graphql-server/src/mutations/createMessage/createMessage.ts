import resource from '../../utils/api_helper';

export interface ICreateMessage {
  chat_id: string;
  user_id: string;
  message: string;
  token: string;
}

const createMessage = async (args: ICreateMessage) => {
  const res = await resource.message.create(args.chat_id, args.user_id, args.message, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

export default createMessage;
