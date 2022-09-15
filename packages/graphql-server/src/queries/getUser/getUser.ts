import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';

export interface IUser extends AuthBase {}

const getUser = async (args: IUser) => {
  try {
    const res = await sdk.user.getUser(args.auth);
    return res;
  } catch (error) {
    return error;
  }
};

export default getUser;
