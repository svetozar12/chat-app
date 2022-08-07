import api_helper from "../services/graphql/api_helper";

const timeStamp = (createdAt: string) => {
  if (typeof createdAt != "string") return "Bad input";
  const date = new Date(createdAt);
  const currentHours: string | number = date.getHours().toString();
  const currentMinutes: string | number = date.getMinutes().toString();
  const time_stamp = `${currentHours.padStart(2, "0")}:${currentMinutes.padStart(2, "0")}`;

  return time_stamp;
};

const getFirstChat = async (user_id: string, token: string) => {
  try {
    const res = await api_helper.chatroom.getAll(user_id, token);
    if (res.length <= 0) return;
    const [{ _id: getAllChats }] = res;

    return getAllChats;
  } catch (error) {
    console.error(error);

    return false;
  }
};

const handleSubmitOnEnter = (e: any, SubmitFunc) => {
  if (e.key === "Enter") {
    SubmitFunc(e);
  }
};

const generic = { handleSubmitOnEnter, getFirstChat, timeStamp };

export default generic;
