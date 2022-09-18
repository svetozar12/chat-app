import axios from "axios";

import auth from "./resources/auth";
import user from "./resources/user";
import chat from "./resources/chat";
import message from "./resources/message";
import invite from "./resources/invite";

export const apiHost = "http://localhost:4002";

export const instance = axios.create({
  baseURL: apiHost,
});

const sdk = {
  auth,
  user,
  chat,
  message,
  invite,
};

export default sdk;
