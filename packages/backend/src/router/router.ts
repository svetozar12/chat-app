import * as express from "express";
const route = express.Router();
require("dotenv").config();
import { route as users_route } from "./users_route/users_route";
import { route as invite_route } from "./invite_route/invite_route";
import { route as chat_route } from "./chatRoom_route/chatRoom_route";
import { route as messages } from "./messages_route/messages";
import { auth } from "./auth";

route.use("/users", users_route);
route.use("/", invite_route);
route.use("/chat-room", chat_route);
route.use("/messages", messages);
route.use("/auth", auth);

export default route;
