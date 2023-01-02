import { AuthBase } from '../../../constants';
import { ERROR, MESSAGES_LIST } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IMessage extends AuthBase {
  chat_id: string;
  query: {
    page_size: number;
    page_number: number;
  };
}

const getAllMessages = async (_: unknown, args: IMessage) => {
  const res: any = await sdk.message.getMessages(args.auth, args.chat_id, {
    page_number: args.query.page_number,
    page_size: args.query.page_size,
  });

  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGES_LIST, res };
};

export default getAllMessages;
