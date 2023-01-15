import { CREATE_CHAT_MESSAGE, ERROR } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

const createInviteGroupChat = async (_: unknown, args: { usersData: string[] }) => {
  const res: any = await sdk.invite.createGroupChat(args.usersData);
  if (res.__typename === ERROR) return res;
  return { __typename: CREATE_CHAT_MESSAGE, ...(res as any) };
};

export default createInviteGroupChat;
