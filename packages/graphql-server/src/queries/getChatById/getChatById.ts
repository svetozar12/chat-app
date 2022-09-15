import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';

export interface IChat extends AuthBase {
  chat_id: string;
}

const getChatById = async (args: IChat) => {
  try {
    const res = await sdk.chat.getChatById(args.auth, args.chat_id);
    return res;
  } catch (error) {
    return error;
  }
};

export default getChatById;
