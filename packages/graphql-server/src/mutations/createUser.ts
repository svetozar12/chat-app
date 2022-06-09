import resource from "../api_helper";

interface ICreateUser {
  user: {
    username: string;
    password: string;
    email: string;
    gender: "Male" | "Female" | "Other";
  };
}

const createUser = async (args: ICreateUser) => {
  const res = await resource.user.create(args.user);

  return res.data;
};

export default createUser;
