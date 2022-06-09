import resource from "../api_helper/index";

interface IUser {
  user_id: string;
  token: string;
}

const getUser = async (args: IUser) => {
  const res = await resource.user.getById(args.user_id, args.token);
  if (res) return res.data.user;
};

export default getUser;
