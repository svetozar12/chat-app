// resources
import axios from "axios";
import user from "./resources/users";
import auth from "./resources/auth";
import message from "./resources/message";
import invite from "./resources/invite";
import chatroom from "./resources/chatroom";

export const api = axios.create({
  baseURL: "http://localhost:4001/graphql",
  method: "POST",
  headers: { "Content-Type": "application/json" },
});

const gqlSdk = {
  user,
  auth,
  message,
  invite,
  chatroom,
};

export default gqlSdk;
