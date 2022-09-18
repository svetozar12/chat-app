import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";

export interface ILogoutUser extends AuthBase {}

const logoutUser = async (args: ILogoutUser) => {
  try {
    const res = await sdk.auth.logout(args.auth);
    return res;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default logoutUser;
