import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export interface ICreateInvite extends AuthBase {
  reciever: string;
}

const createInvite = async (_: unknown, args: ICreateInvite) => {
  const res = await sdk.invite.create(args.auth, args.reciever);
  return res;
};

export default createInvite;
