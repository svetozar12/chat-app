import resource from "../api_helper";

interface IChat {
  user_id: string;
  chat_id: string;
  token: string;
}

const getChatById = async (args: IChat) => {
  const res = await resource.chats.getById(args.chat_id, args.user_id, args.token);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);
  const {
    data: { data },
  } = res;

  return data;
};

export default getChatById;
