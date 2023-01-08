import { AuthBase } from '../../../constants';
import { CHAT, ERROR } from '../../../constants/typenames';
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
  const res: any = await sdk.chat.createChat(args.auth, args.chat);
  if (res.__typename === ERROR) return res;

  return { __typename: CHAT, ...res };
};

export default createChat;
