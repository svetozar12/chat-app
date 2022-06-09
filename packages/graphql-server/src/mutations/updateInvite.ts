import resource from "../api_helper/index";

interface IupdateInvite {
  user_id: string;
  token: string;
  status: "recieved" | "accepted" | "declined";
}

const updateInvite = async (args: IupdateInvite) => {
  const res = await resource.invite.update(args.user_id, args.status, args.token);
  return res.data;
};

export default updateInvite;
