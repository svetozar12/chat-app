import { Router, Request, Response, NextFunction } from 'express';
import RequestLogger from '../middlewares/RequestLogger';

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
  const router = Router();
  routeControllers.forEach((element) => {
    const { handler, route, type, preMethods } = element;
    !!preMethods
      ? router[type](route, ...preMethods, (req: Request, res: Response, next: NextFunction) => {
          return handler(req, res, next);
        })
      : router[type](route, (req, res, next) => {
          return handler(req, res, next);
        });
  });
  return router;
};

export default buildRoute;
