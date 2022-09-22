import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface IMessage extends AuthBase {
  chat_id: string;
  query: {
    page_size: number;
    page_number: number;
  };
}

const getAllMessages = async (args: IMessage) => {
  const res = await sdk.message.getMessages(args.auth, args.chat_id, {
    page_number: args.query.page_number,
    page_size: args.query.page_size,
  });
  return res;
};

export default getAllMessages;
