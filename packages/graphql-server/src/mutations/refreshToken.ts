import resource from '../api_helper/index';
export interface IRefreshToken {
  user_id: string;
  token: string;
}

const refreshToken = async (args: IRefreshToken) => {
  const res = await resource.auth.refresh(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.data;
};

export default refreshToken;
