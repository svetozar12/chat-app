import { AuthBase } from '../../../constants';
import { ERROR, MESSAGES } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface ICreateMessage extends AuthBase {
  chat_id: string;
  message: string;
}

const createMessage = async (_: unknown, args: ICreateMessage) => {
  const res: any = await sdk.message.createMessage(args.auth, args.chat_id, {
    message: args.message,
  });

  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGES, ...res };
};

export default createMessage;
