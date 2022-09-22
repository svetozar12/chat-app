import sdk from "../../../utils/sdk";

export interface ILoginUser {
  username: string;
  password: string;
}

const loginUser = async (parent: unknown, args: ILoginUser) => {
  const res = await sdk.auth.login(args);
  return res;
};

export default loginUser;
