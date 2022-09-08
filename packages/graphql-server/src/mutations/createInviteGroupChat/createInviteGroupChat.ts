import resource from '../../utils/api_helper';

const createInviteGroupChat = async (args: { usersData: string[] }) => {
  const res = await resource.invite.createGroupChat(args.usersData);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

export default createInviteGroupChat;
