import { AuthBase } from '../../../constants';
import { CREATE_CHAT_MESSAGE } from '../../../constants/typenames';
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
  return { __typename: CREATE_CHAT_MESSAGE, ...res };
};

export default createChat;
