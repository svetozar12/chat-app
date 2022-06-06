import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom-error.model";
import { client } from "../config/redis_config";
import TokenBL from "../models/TokenBL.model";
/**
 * verifyToken is an middleware function
 * this function compares the user_id with the jwt user_id
 *  to check if the user is trying to get other user data
 * @param secret this is the jwt secret from the .env variables
 */

const blackListCheck = async (token: string) => {
  try {
    const redistToken = await client.LRANGE("token", 0, -1);
    console.log(token, redistToken);

    console.log(redistToken.some((element) => element === token));

    let mongoToken: any | null;
    if (redistToken.length === 0) mongoToken = (await TokenBL.findOne({ token }))?.token;

    if (redistToken.some((element) => element === token)) {
      return true;
    } else if (mongoToken === token) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const Auth = (secret: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "undefined") return next(CustomError.forbidden("Forbidden"));

    const user_id = req.body.user_id || req.params.user_id || req.query.user_id;
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const isTokenBlackListed = await blackListCheck(bearerToken);

    if (isTokenBlackListed) return next(CustomError.forbidden("Token has been blacklisted"));
    jwt.verify(bearerToken, secret, async (err: any, decoded: any) => {
      console.log(err);

      if (err) return next(CustomError.forbidden("Token has expired or invalid secret"));
      const current_id = decoded._id;
      // delete logs on production
      console.log(current_id, user_id);
      if (current_id !== user_id) return next(CustomError.unauthorized("Can't access other users data"));
      req.token = decoded;
      next();
    });
  };
};

export default Auth;
