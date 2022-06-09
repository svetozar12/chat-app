import resource from "../api_helper/index";

interface ICreateChat {
  chat: {
    user_id: string;
    invite_id: string;
    user1: string;
    user2: string;
  };
  token: string;
}

const createChat = async (args: ICreateChat) => {
  const res = await resource.chats.create(args.chat, args.token);
  console.log(res.data);

  return res.data;
};

export default createChat;
