import { Router, Request, Response, NextFunction } from 'express';

export enum RequestTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IBaseController {
  type: RequestTypes;
  route: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  preMethods?: Array<(...args: any) => void>;
}

const buildRoute = (routeControllers: Array<IBaseController>): Router => {
  console.log('buildRoute', routeControllers);

  const router = Router();
  routeControllers.forEach((element) => {
    const { handler, route, type, preMethods } = element;
    console.log(!!preMethods);
    !!preMethods
      ? /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
         */
        router[type](route, ...preMethods, (req: Request, res: Response, next: NextFunction) => {
          console.log(req.res, 'bodyUtil');

          return handler(req, res, next);
        })
      : /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
         */
        router[type](route, (req, res, next) => {
          console.log(req.body, 'bodyUtil');

          return handler(req, res, next);
        });
  });
  return router;
};

export default buildRoute;
