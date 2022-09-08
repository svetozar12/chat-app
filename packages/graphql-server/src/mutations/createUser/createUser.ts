import resource from '../../utils/api_helper';

export interface ICreateUser {
  user: {
    username: string;
    password: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
  };
}

const createUser = async (args: ICreateUser) => {
  const res = await resource.user.create(args.user);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data;
};

export default createUser;
