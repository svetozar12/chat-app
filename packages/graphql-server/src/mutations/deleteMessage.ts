import resource from '../api_helper/index';

export interface IDeleteMessage {
  message_id: string;
  user_id: string;
  token: string;
}

const deleteMessage = async (args: IDeleteMessage) => {
  const res = await resource.message.delete(args.message_id, args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default deleteMessage;
