import sdk from "../../../utils/sdk";

export interface ILoginUser {
  username: string;
  password: string;
}

const loginUser = async (args: ILoginUser) => {
  try {
    const res = await sdk.auth.login(args);
    return res;
  } catch (error) {
    return error;
  }
};

export default loginUser;
