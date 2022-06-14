import resource from "../api_helper/index";

interface IGetAll {
  user_id: string;
  token: string;
  status?: string;
}

const getInvitesByReciever = async (parent: undefined, args: IGetAll, context: undefined) => {
  const res = await resource.invite.getAllByReciever(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

const getInvitesByInviter = async (args: IGetAll) => {
  const res = await resource.invite.getAllByInviter(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

const getInvites = { getInvitesByReciever, getInvitesByInviter };

export default getInvites;
