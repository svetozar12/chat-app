import { EnvelopError } from '@graphql-yoga/node';
import { LOGIN_USER } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface ILoginUser {
  username: string;
  password: string;
}

const loginUser = async (_: unknown, args: ILoginUser) => {
  const res = await sdk.auth.login(args);
  if (res instanceof EnvelopError) return res;
  return { __typename: LOGIN_USER, ...res };
};

export default loginUser;
