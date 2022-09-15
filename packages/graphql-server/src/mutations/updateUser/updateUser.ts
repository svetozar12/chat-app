import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';
import { Gender } from '../../utils/sdk/types/common';

export interface IUpdateUser extends AuthBase {
  user: {
    username: string;
    email: string;
    gender: Gender;
  };
}

const updateUser = async (args: IUpdateUser) => {
  try {
    const res = await sdk.user.updateUser(args.auth, args.user);
    return res;
  } catch (error) {
    return error;
  }
};

export default updateUser;
