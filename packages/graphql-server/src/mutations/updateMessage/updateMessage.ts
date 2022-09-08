import resource from '../../utils/api_helper';

export interface IUpdateMessage {
  message_id: string;
  user_id: string;
  newMessage: string;
  token: string;
}

const updateMessage = async (args: IUpdateMessage) => {
  const res = await resource.message.update(args.message_id, args.user_id, args.newMessage, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default updateMessage;
