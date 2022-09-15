import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';

export interface IDeleteMessage extends AuthBase {
  message_id: string;
}

const deleteMessage = async (args: IDeleteMessage) => {
  try {
    const res = await sdk.message.deleteMessage(args.auth, args.message_id);
    return res;
  } catch (error) {
    return error;
  }
};

export default deleteMessage;
