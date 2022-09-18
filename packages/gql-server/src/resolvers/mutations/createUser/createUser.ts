import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";
import { Gender } from "../../../utils/sdk/types/common";

export interface ICreateUser {
  user: {
    username: string;
    password: string;
    email: string;
    gender: Gender;
  };
}

const createUser = async (args: ICreateUser) => {
  try {
    const res = await sdk.user.createUser(args.user);
    return res;
  } catch (error) {
    return error;
  }
};

export default createUser;
