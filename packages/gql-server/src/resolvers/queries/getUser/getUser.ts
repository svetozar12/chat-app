import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export type IUser = AuthBase;

const getUser = async (_: unknown, args: IUser) => {
  return await sdk.user.getUser(args.auth);
};

export default getUser;
