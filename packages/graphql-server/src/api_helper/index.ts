import axios from "axios";
import constants from "../constants";
// resources
import user from "./resources/user";
import auth from "./resources/auth";
import message from "./resources/message";
import invite from "./resources/invite";
import chats from "./resources/chats";

export const api = axios.create({
  baseURL: constants.api_url,
});

const resource = {
  auth,
  user,
  message,
  invite,
  chats,
};

export default resource;
