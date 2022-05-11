import { Application, Router } from "express";
// controllers
import { MessageController } from "./controllers/MessagesController";
import { UsersController } from "./controllers/UsersController";
import { ChatRoomController } from "./controllers/ChatRoomController";
import { AuthController } from "./controllers/AuthController";
import { InvitesController } from "./controllers/InvitesController";

const _routes: [string, Router][] = [
  ["/users", UsersController],
  ["/messages", MessageController],
  ["/chat-room", ChatRoomController],
  ["/auth", AuthController],
  ["/invites", InvitesController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
