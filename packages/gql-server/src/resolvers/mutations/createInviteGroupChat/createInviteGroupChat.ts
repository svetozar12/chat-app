import { CREATE_CHAT_MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

const createInviteGroupChat = async (_: unknown, args: { usersData: string[] }) => {
  const res = await sdk.invite.createGroupChat(args.usersData);
  return { __typename: CREATE_CHAT_MESSAGE, ...(res as any) };
};

export default createInviteGroupChat;
