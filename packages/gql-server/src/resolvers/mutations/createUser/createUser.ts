import logger from '../../../utils/logger';
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

const createUser = async (_: unknown, args: ICreateUser) => {
  const res = await sdk.user.createUser(args.user);
  logger('info', 'CREATE-REST-USER', [String(res)]);
  return res;
};

export default createUser;
