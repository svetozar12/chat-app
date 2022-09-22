import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';
import { Gender } from '../../../utils/sdk/types/common';

export interface ICreateUser {
  user: {
    username: string;
    password: string;
    email: string;
    gender: Gender;
  };
}

const createUser = async (args: ICreateUser) => {
  const res = await sdk.user.createUser(args.user);
  return res;
};

export default createUser;
