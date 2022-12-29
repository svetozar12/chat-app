import { AuthBase } from '../../../constants';
import { GET_USER } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type IUser = AuthBase;

const getUser = async (_: unknown, args: IUser) => {
  const res = await sdk.user.getUser(args.auth);
  return { __typename: GET_USER, ...res };
};

export default getUser;
