import { AuthBase } from '../../../constants';
import { ERROR, MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type IDeleteUser = AuthBase;

const deleteUser = async (_: unknown, args: IDeleteUser) => {
  const res: any = await sdk.user.delteUser(args.auth);
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default deleteUser;
