import resource from "../api_helper/index";

const createInviteGroupChat = async (args: { usersData: string[] }) => {
  const res = await resource.invite.createGroupChat(args.usersData);

  return res.data;
};

export default createInviteGroupChat;
