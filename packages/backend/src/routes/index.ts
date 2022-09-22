import { Application, Router } from 'express';
// routes
import ChatRoomRoute from './ChatRooms';
import AuthRoute from './Auth';
import InvitesRoute from './Invites/index';
import MessagesRoute from './Messages/index';
import UsersRoute from './Users/index';

const route = Router();

const controllers: Array<{ Route: Router; endpoint: string }> = [
  { Route: UsersRoute, endpoint: '/users' },
  { Route: MessagesRoute, endpoint: '/messages' },
  { Route: ChatRoomRoute, endpoint: '/chats' },
  { Route: AuthRoute, endpoint: '/auth' },
  { Route: InvitesRoute, endpoint: '/invites' },
];

controllers.forEach((controller) => {
  const { Route, endpoint } = controller;
  route.use(endpoint, Route);
  console.log(endpoint, Route);
});

export default route;
