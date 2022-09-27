import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error.model';

const Validator = (validator: Joi.ObjectSchema<any>, property: 'body' | 'params' | 'query') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.validateAsync(req[property]);

      next();
    } catch (error: any) {
      if (error.isJoi) {
        return next(new CustomError(error.message, 422));
      }
      next(CustomError.badRequest('Something went wrong'));
    }
  };
};

export default Validator;
