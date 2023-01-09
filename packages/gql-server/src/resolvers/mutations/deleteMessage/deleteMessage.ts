import { AuthBase } from '../../../constants';
import { ERROR, MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IDeleteMessage extends AuthBase {
  message_id: string;
}

const deleteMessage = async (_: unknown, args: IDeleteMessage) => {
  const res: any = await sdk.message.deleteMessage(args.auth, args.message_id);
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default deleteMessage;
