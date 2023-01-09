import { AuthBase } from '../../../constants';
import { ERROR, MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IDeleteChat extends AuthBase {
  user_id: string;
  chat_id: string;
  token: string;
}

const deleteChat = async (_: unknown, args: IDeleteChat) => {
  const res: any = await sdk.chat.deleteChat(args.chat_id, args.auth);
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default deleteChat;
