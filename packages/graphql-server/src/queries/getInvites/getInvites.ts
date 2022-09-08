import resource from '../../utils/api_helper';

export interface IGetAll {
  user_id: string;
  token: string;
  status?: string | any;
}

const getInvitesByReciever = async (args: IGetAll) => {
  const res = await resource.invite.getAllByReciever(args.user_id, args.token, args.status);

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
