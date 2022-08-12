import resource from "../api_helper/index";

interface ILogoutUser {
  user_id: string;
  token: string;
}

const logoutUser = async (parent: undefined, args: ILogoutUser, context: undefined) => {
  const res = await resource.auth.logout(args.user_id, args.token);
  console.log(res);

  return res.data;
};

export default logoutUser;
