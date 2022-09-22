import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface IUpdateMessage extends AuthBase {
  message_id: string;
  newMessage: string;
}

const updateMessage = async (args: IUpdateMessage) => {
  const res = await sdk.message.updateMessage(args.auth, args.message_id, {
    message: args.newMessage,
  });
  return res;
};

export default updateMessage;
