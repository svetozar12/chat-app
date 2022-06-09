import resource from "../api_helper/index";

interface IGetAll {
  id: string;
  token: string;
}

const getAllChats = async (args: IGetAll) => {
  const res = await resource.chats.getAll(args.id, args.token);
  return res.data;
};

export default getAllChats;
