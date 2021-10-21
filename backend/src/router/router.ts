import * as express from "express";
const route = express.Router();

import { route as users_route } from "./users_route/users_route";
import { route as invite_route } from "./invite_route/invite_route";
import { route as chat_route } from "./chatRoom_route/chatRoom_route";

route.use("/", users_route);
route.use("/", invite_route);
route.use("/", chat_route);

export default route;
