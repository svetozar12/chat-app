import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    logger('info', `${req.protocol}://${req.hostname}`, [req.path, res.statusCode, res.statusMessage, 'gered']);
  });
  return next();
};

export default RequestLogger;
