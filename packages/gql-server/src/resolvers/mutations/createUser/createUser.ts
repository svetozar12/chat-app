import { ERROR, MESSAGE } from '../../../constants/typenames';
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
  const res: any = await sdk.user.createUser(args.user);
  if (res.__typename === ERROR) return res;
  return { __typename: MESSAGE, ...res };
};

export default createUser;
