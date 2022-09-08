import { Request, Response, NextFunction } from "express";
declare const errorHandler: (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default errorHandler;
