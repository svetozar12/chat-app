import { AuthBase } from '../../../constants';
import { ERROR, MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type ILogoutUser = AuthBase;

const logoutUser = async (_: unknown, args: ILogoutUser) => {
  const res: any = await sdk.auth.logout(args.auth);
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default logoutUser;
