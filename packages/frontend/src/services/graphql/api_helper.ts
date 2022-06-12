import user from "./resources/users";
import auth from "./resources/auth";
import message from "./resources/message";
import invite from "./resources/invite";
import chatroom from "./resources/chatroom";
import axios from "axios";
import { constants } from "../../constants";

const api = axios.create({ baseURL: constants.GRAPHQL_URL, method: "POST", headers: { "Content-Type": "application/json" } });

const api_helper = {
  user,
  auth,
  message,
  invite,
  chatroom,
};

export { api };
export default api_helper;
