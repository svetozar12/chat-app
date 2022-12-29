import { AuthBase } from '../../../constants';
import { MESSAGES } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IChat extends AuthBase {
  chat_id: string;
}

const getChatById = async (_: unknown, args: IChat) => {
  const res = await sdk.chat.getChatById(args.auth, args.chat_id);
  return { __typename: MESSAGES, ...res };
};

export default getChatById;
