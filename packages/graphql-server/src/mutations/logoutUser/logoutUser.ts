import resource from '../../utils/api_helper';

export interface ILogoutUser {
  user_id: string;
  token: string;
}

const logoutUser = async (args: ILogoutUser) => {
  const res = await resource.auth.logout(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default logoutUser;
