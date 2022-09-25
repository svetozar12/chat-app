import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';
import { Gender } from '../../../utils/sdk/types/common';

export interface IUpdateUser extends AuthBase {
  user: {
    username: string;
    email: string;
    gender: Gender;
  };
}

const updateUser = async (_: unknown, args: IUpdateUser) => {
  const res = await sdk.user.updateUser(args.auth, args.user);
  return res;
};

export default updateUser;
