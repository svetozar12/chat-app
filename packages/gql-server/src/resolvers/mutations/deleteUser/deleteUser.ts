import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";

export interface IDeleteUser extends AuthBase {}

const deleteUser = async (args: IDeleteUser) => {
  try {
    const res = await sdk.user.delteUser(args.auth);
    return res;
  } catch (error) {
    return error;
  }
};

export default deleteUser;
