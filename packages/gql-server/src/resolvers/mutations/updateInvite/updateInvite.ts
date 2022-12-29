import { AuthBase } from '../../../constants';
import { INVITE } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';
import { Status } from '../../../utils/sdk/types/common';

export interface IupdateInvite extends AuthBase {
  invite_id: string;
  status: Status;
}

const updateInvite = async (_: unknown, args: IupdateInvite) => {
  const res = await sdk.invite.update(args.auth, args.invite_id, args.status);
  return { __typename: INVITE, ...(res as any) };
};

export default updateInvite;
