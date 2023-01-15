import { AuthBase } from '../../../constants';
import { ERROR, GET_USER_LIST } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IUser extends AuthBase {
  userIds: string[];
}

const getUserList = async (_: unknown, args: IUser) => {
  const res = await sdk.user.getUserList(args.auth, args.userIds);
  if (res.__typename === ERROR) return res;
  return { __typename: GET_USER_LIST, res };
};

export default getUserList;
