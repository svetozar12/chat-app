import { AuthBase } from '../../../constants';
import { MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type ILogoutUser = AuthBase;

const logoutUser = async (_: unknown, args: ILogoutUser) => {
  const res = await sdk.auth.logout(args.auth);
  return { __typename: MESSAGE, ...res };
};

export default logoutUser;
