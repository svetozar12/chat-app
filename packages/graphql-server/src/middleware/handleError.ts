import { Request, Response, NextFunction } from "express";

const errorHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

// const errorHandler = (fn: any) => {
//   console.log(fn, "HOB");

//   return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
// };

export default errorHandler;
