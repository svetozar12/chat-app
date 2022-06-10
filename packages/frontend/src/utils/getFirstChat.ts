import api_helper from "../graphql/api_helper";
export const getFirstChat = async (user_id: string, token: string) => {
  try {
    const res = await api_helper.chatroom.getAll(user_id, token);

    if (res.getAllChats.length <= 0) return;
    const data = res.getAllChats[0]._id;

    return data;
  } catch (error) {
    console.error(error);

    return false;
  }
};
