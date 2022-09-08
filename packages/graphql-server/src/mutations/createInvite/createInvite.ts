import resource from '../../utils/api_helper';

export interface ICreateInvite {
  user_id: string;
  reciever: string;
  token: string;
}

const createInvite = async (args: ICreateInvite) => {
  const res = await resource.invite.create(args.user_id, args.reciever, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

export default createInvite;
