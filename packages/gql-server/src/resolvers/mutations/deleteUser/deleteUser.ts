import { AuthBase } from '../../../constants';
import { MESSAGE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type IDeleteUser = AuthBase;

const deleteUser = async (_: unknown, args: IDeleteUser) => {
  const res = await sdk.user.delteUser(args.auth);
  return { __typename: MESSAGE, ...res };
};

export default deleteUser;
