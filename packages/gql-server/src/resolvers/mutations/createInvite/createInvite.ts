import { AuthBase } from '../../../constants';
import { ERROR, INVITE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export interface ICreateInvite extends AuthBase {
  reciever: string;
}

const createInvite = async (_: unknown, args: ICreateInvite) => {
  const res: any = await sdk.invite.create(args.auth, args.reciever);
  if (res.__typename === ERROR) return res;
  return { __typename: INVITE, ...(res as any) };
};

export default createInvite;
