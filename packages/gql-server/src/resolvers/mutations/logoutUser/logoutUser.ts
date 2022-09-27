import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export type ILogoutUser = AuthBase;

const logoutUser = async (_: unknown, args: ILogoutUser) => {
  const res = await sdk.auth.logout(args.auth);
  return res;
};

export default logoutUser;
