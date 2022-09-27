import resource from "../api_helper/index";

interface IGetAll {
  user_id: string;
  token: string;
}

const getAllChats = async (args: IGetAll) => {
  const res = await resource.chats.getAll(args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  return res.data.contacts;
};

export default getAllChats;
