import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface IDeleteMessage extends AuthBase {
  message_id: string;
}

const deleteMessage = async (_: unknown, args: IDeleteMessage) => {
  const res = await sdk.message.deleteMessage(args.auth, args.message_id);
  return res;
};

export default deleteMessage;
