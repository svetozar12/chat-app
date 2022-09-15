import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';

export interface ICreateInvite extends AuthBase {
  reciever: string;
}

const createInvite = async (args: ICreateInvite) => {
  try {
    const res = await sdk.invite.create(args.auth, args.reciever);
    return res;
  } catch (error) {
    return error;
  }
};

export default createInvite;
