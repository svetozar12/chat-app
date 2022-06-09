import axios from "axios";
export const getFirstChat = async (name: string) => {
  try {
    const res = await axios.get(name);
    if (res.data.contacts.length <= 0) return;
    const data = res.data.contacts[0];

    return data;
  } catch (error) {
    return false;
  }
};
