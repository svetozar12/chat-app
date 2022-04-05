import { requestUrl } from "./hostUrl_requestUrl";
import axios from "axios";
export const getFirstChat = async (name: string) => {
  try {
    const res = await axios.get(`${requestUrl}/chat-room/?user_name=${name}`);
    if (res.data.contacts.length <= 0) return;
    const data = res.data.contacts[0];

    return data;
  } catch (error) {
    return false;
  }
};
