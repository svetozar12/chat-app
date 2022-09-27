import axios from "axios";
import { env } from "../../config/env";

import auth from "./resources/auth";
import user from "./resources/user";
import chat from "./resources/chat";
import message from "./resources/message";
import invite from "./resources/invite";

export const instance = axios.create({
  baseURL: env.API_URL,
});

const sdk = {
  auth,
  user,
  chat,
  message,
  invite,
};

export default sdk;
