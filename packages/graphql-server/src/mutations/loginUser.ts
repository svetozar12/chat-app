import resource from "../api_helper/index";

interface ILoginUser {
  username: string;
  password: string;
}

const loginUser = async (args: ILoginUser) => {
  const res = await resource.auth.login(args);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);

  return res.data.data;
};

export default loginUser;
