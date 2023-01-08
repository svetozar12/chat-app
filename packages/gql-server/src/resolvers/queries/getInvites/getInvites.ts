import { AuthBase } from '../../../constants';
import { ERROR, INVITE_LIST } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';
import { Status } from '../../../utils/sdk/types/common';

export interface IGetAll extends AuthBase {
  status?: Status;
}

const getInvitesByReciever = async (_: unknown, args: IGetAll) => {
  const res: any = await sdk.invite.getAllByReciever(args.auth, args.status);
  if (res.__typename === ERROR) return res;
  return { __typename: INVITE_LIST, res };
};

const getInvitesByInviter = async (_: unknown, args: IGetAll) => {
  const res: any = await sdk.invite.getAllByInviter(args.auth, args.status);
  if (res.__typename === ERROR) return res;
  return { __typename: INVITE_LIST, res };
};

const getInvites = { getInvitesByReciever, getInvitesByInviter };

export default getInvites;
