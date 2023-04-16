import { Router } from 'express';
import { messageRouter } from './messages/message.route';

const routes = Router();

const routers: Array<{ Route: Router; endpoint: string }> = [
  {
    endpoint: '/messages',
    Route: messageRouter,
  },
];

routers.forEach(({ Route, endpoint }) => {
  routes.use(endpoint, Route);
});

export { routes };
