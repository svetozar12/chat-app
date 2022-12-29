import { AuthBase } from '../../../constants';
import { MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IDeleteMessage extends AuthBase {
  message_id: string;
}

const deleteMessage = async (_: unknown, args: IDeleteMessage) => {
  const res = await sdk.message.deleteMessage(args.auth, args.message_id);
  return { __typename: MESSAGE, ...res };
};

export default deleteMessage;
