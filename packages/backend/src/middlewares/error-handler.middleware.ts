import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error.model';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */

const handleError = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({ Message: err.Message });
  }

  // remove the log in production
  console.log(err);
  res.status(500).json({ ErrorMsg: 'Internal server error' });
};

export default handleError;
