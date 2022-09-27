import resource from "../api_helper/index";

const createInviteGroupChat = async (args: { usersData: string[] }) => {
  const res = await resource.invite.createGroupChat(args.usersData);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

export default createInviteGroupChat;
