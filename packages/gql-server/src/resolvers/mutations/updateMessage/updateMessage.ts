import { AuthBase } from '../../../constants';
import { ERROR, MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IUpdateMessage extends AuthBase {
  message_id: string;
  newMessage: string;
}

const updateMessage = async (_: unknown, args: IUpdateMessage) => {
  const res: any = await sdk.message.updateMessage(args.auth, args.message_id, {
    message: args.newMessage,
  });
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default updateMessage;
