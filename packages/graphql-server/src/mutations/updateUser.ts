import resource from "../api_helper/index";

interface IUpdateUser {
  user_id: string;
  token: string;
  user: {
    username: string;
    email: string;
    gender: "Male" | "Female" | "Other";
  };
}

const updateUser = async (args: IUpdateUser) => {
  const res = await resource.user.update(args.user, args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default updateUser;
