import resource from "../api_helper/index";

interface ILoginUser {
  username: string;
  password: string;
}

const loginUser = async (args: ILoginUser) => {
  const res = await resource.auth.login(args);

  return res.data.data;
};

export default loginUser;
