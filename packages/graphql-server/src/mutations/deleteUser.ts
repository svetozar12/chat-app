import resource from '../api_helper/index';

export interface IDeleteUser {
  user_id: string;
  token: string;
}

const deleteUser = async (args: IDeleteUser) => {
  const res = await resource.user.delete(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default deleteUser;
