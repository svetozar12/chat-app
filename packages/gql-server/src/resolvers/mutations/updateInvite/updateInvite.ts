import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";
import { Status } from "../../../utils/sdk/types/common";

export interface IupdateInvite extends AuthBase {
  invite_id: string;
  status: Status;
}

const updateInvite = async (args: IupdateInvite) => {
  try {
    const res = await sdk.invite.update(args.auth, args.invite_id, args.status);
    return res;
  } catch (error) {
    return error;
  }
};

export default updateInvite;
