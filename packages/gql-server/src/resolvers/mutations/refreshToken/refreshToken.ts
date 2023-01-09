import { ERROR, LOGIN_USER } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface IRefreshToken {
  user_id: string;
  RefreshToken: string;
}

const refreshToken = async (_: unknown, args: IRefreshToken) => {
  const res: any = await sdk.auth.refresh(args.user_id, args.RefreshToken);
  if (res.__typename === ERROR) return res;
  return { __typename: LOGIN_USER, ...res };
};

export default refreshToken;
