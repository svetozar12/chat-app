import api_helper from "../services/graphql/api_helper";
export const getFirstChat = async (user_id: string, token: string) => {
  try {
    const res = await api_helper.chatroom.getAll(user_id, token);
    if (res.length <= 0) return;
    const [{ _id: getAllChats }] = res;

    return getAllChats;
  } catch (error) {
    console.error(error);

    return error.message;
  }
};
