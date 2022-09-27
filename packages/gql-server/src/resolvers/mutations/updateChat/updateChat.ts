import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface IUpdateChat extends AuthBase {
  chat_id: string;
  username?: string;
  usersData?: string[];
}

const updateChat = async (_: unknown, args: IUpdateChat) => {
  const res = await sdk.chat.updateChat(args.chat_id, args.auth, {
    username: args.username as string,
    usernames: args.usersData as string[],
  });
  return res;
};

export default updateChat;
