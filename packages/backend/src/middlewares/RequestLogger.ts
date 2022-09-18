import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    logger('warn', 'REST-API-SERVER-REQUEST-LOG');
    logger('info', `${req.protocol}://${req.get('host')}`, [req.path, res.statusCode, res.statusMessage]);
  });
  return next();
};

export default RequestLogger;
