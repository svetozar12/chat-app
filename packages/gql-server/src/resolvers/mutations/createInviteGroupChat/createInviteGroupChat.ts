import sdk from "../../../utils/sdk";

const createInviteGroupChat = async (args: { usersData: string[] }) => {
  try {
    const res = await sdk.invite.createGroupChat(args.usersData);
    return res;
  } catch (error) {
    return error;
  }
};

export default createInviteGroupChat;
