import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface IDeleteChat extends AuthBase {
  user_id: string;
  chat_id: string;
  token: string;
}

const deleteChat = async (_: unknown, args: IDeleteChat) => {
  const res = await sdk.chat.deleteChat(args.chat_id, args.auth);
  return res;
};

export default deleteChat;
