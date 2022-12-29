import { AuthBase } from '../../../constants';
import { MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IDeleteChat extends AuthBase {
  user_id: string;
  chat_id: string;
  token: string;
}

const deleteChat = async (_: unknown, args: IDeleteChat) => {
  const res = await sdk.chat.deleteChat(args.chat_id, args.auth);
  return { __typename: MESSAGE, res };
};

export default deleteChat;
