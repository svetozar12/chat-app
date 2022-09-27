import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';
import { Status } from '../../../utils/sdk/types/common';

export interface IGetAll extends AuthBase {
  status?: Status;
}

const getInvitesByReciever = async (_: unknown, args: IGetAll) => {
  const res = await sdk.invite.getAllByReciever(args.auth, args.status);
  return res;
};

const getInvitesByInviter = async (_: unknown, args: IGetAll) => {
  const res = await sdk.invite.getAllByInviter(args.auth, args.status);
  return res;
};

const getInvites = { getInvitesByReciever, getInvitesByInviter };

export default getInvites;
