import { AuthBase } from '../../../constants';
import { ERROR } from '../../../constants/typenames';
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
  const res: any = await sdk.user.updateUser(args.auth, args.user);
  if (res.__typename === ERROR) return res;
  return res;
};

export default updateUser;
