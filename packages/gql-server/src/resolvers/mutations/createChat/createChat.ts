import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface ICreateChat extends AuthBase {
  chat: {
    user_id: string;
    invite_id: string;
    user1: string;
    user2: string;
  };
}

const createChat = async (_: unknown, args: ICreateChat) => {
  const res = await sdk.chat.createChat(args.auth, args.chat);
  return res;
};

export default createChat;
