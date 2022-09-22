import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export type IDeleteUser = AuthBase;

const deleteUser = async (args: IDeleteUser) => {
  const res = await sdk.user.delteUser(args.auth);
  return res;
};

export default deleteUser;
