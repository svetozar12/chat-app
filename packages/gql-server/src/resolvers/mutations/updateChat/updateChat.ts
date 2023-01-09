import { AuthBase } from '../../../constants';
import { CHAT, ERROR } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IUpdateChat extends AuthBase {
  chat_id: string;
  username?: string;
  usersData?: string[];
}

const updateChat = async (_: unknown, args: IUpdateChat) => {
  const res: any = await sdk.chat.updateChat(args.chat_id, args.auth, {
    username: args.username as string,
    usernames: args.usersData as string[],
  });
  if (res.__typename === ERROR) return res;
  return { __typename: CHAT, ...res };
};

export default updateChat;
