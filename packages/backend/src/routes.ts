import { Application, Router } from "express";
// routes
import { MessagesRoute } from "./controllers/Messages/index";
import { UsersRoute } from "./controllers/Users/index";
import { ChatRoomsRoute } from "./controllers/ChatRooms/index";
import { AuthRoute } from "./controllers/Auth/index";
import { InvitesRoute } from "./controllers/Invites/index";

const _routes: [string, Router][] = [
  ["/users", UsersRoute],
  ["/messages", MessagesRoute],
  ["/chat-room", ChatRoomsRoute],
  ["/auth", AuthRoute],
  ["/invites", InvitesRoute],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
