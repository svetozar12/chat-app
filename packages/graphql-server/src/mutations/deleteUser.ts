import resource from "../api_helper/index";

interface IDeleteUser {
  user_id: string;
  token: string;
}

const deleteUser = async (args: IDeleteUser) => {
  const res = await resource.user.delete(args.user_id, args.token);

  return res.data;
};

export default deleteUser;
