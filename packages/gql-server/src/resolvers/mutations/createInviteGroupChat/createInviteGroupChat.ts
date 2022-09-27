import sdk from '../../../utils/sdk';

const createInviteGroupChat = async (_: unknown, args: { usersData: string[] }) => {
  const res = await sdk.invite.createGroupChat(args.usersData);
  return res;
};

export default createInviteGroupChat;
