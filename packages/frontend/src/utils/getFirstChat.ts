import api_helper from "../graphql/api_helper";
export const getFirstChat = async (user_id: string, token: string) => {
  try {
    const res = await api_helper.chatroom.getAll(user_id, token);
    console.log(res);

    if (res.data.contacts.length <= 0) return;
    const data = res.data.contacts[0];

    return data;
  } catch (error) {
    return false;
  }
};
