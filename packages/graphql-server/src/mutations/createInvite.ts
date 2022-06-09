import resource from "../api_helper/index";

interface ICreateInvite {
  user_id: string;
  reciever: string;
  token: string;
}

const createInvite = async (args: ICreateInvite) => {
  const res = await resource.invite.create(args.user_id, args.reciever, args.token);
  console.log(res.data);

  return res.data.data;
};

export default createInvite;
