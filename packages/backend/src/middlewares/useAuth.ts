// import * as jwt from "jsonwebtoken";
// import * as createError from "http-errors";
// import jwtDecode from "jwt-decode";
// import { client } from "../config/redis_config";
// import TokenWL, { ITokenWL } from "../models/TokensWL.model";

// // veryfies the jwt token
// const verifyHelper = (bearerToken: string, secret: string) => {
//   const decoded: { username: string; password: string; iat: number; exp: number } = jwtDecode(bearerToken);
//   jwt.verify(bearerToken, secret, (err, token) => {
//     if (err) {
//       throw new Error("You don't have permission to do that !");
//     }
//     return decoded.username;
//   });
// };

// export const verifyToken = async (token: string, secret: string) => {
//   if (!token) return "";
//   const bearer = token.split(" ");

//   const bearerToken = bearer[1];
//   // redistToken && mongoToken are used to check if jwt token exist in both redis or mongo,
//   // if there isnt record of jwt we will create new token and save it to redis and mongo
//   const redistToken = (await client.get("access_token")) || (await client.get("refresh_token"));
//   const mongoToken: ITokenWL | null =
//     (await TokenWL.findOne({ access_token: bearerToken })) || (await TokenWL.findOne({ refresh_token: bearerToken }));

//   if (redistToken === bearerToken) {
//     return verifyHelper(bearerToken, secret);
//   } else if (mongoToken?.access_token === bearerToken || mongoToken?.refresh_token === bearerToken) {
//     return verifyHelper(bearerToken, secret);
//   }
//   //if bearer Header isn't undefined seperates JWT from Bearer and later on use method jwt.verify() to verify the jwt
//   return verifyHelper(bearerToken, secret);
// };

// export const signTokens = (
//   data: {
//     username: string;
//     password: string;
//   },
//   access_secret: string,
//   access_expires: string,
//   refresh_secret?: string,
//   refresh_expires?: string,
// ): Promise<{ access_token: string; refresh_token: string }> => {
//   return new Promise((resolve, reject) => {
//     let access_token = "";
//     let refresh_token = "";
//     // creating access token
//     access_secret &&
//       jwt.sign({ ...data, expiresIn: access_expires }, access_secret, (err: any, token: any) => {
//         if (err) {
//           return reject(createError(403, "Token has expired"));
//         }
//         access_token = token;
//       });
//     // creating refresh token
//     refresh_secret &&
//       jwt.sign({ ...data, expiresIn: refresh_expires }, refresh_secret, (err: any, token: any) => {
//         if (err) {
//           return reject(createError(403, "Token has expired"));
//         }
//         refresh_token = token;
//       });

//     if (access_token && refresh_token) {
//       // saves both tokens to mongo and redis
//       const token = new TokenWL({ access_token, refresh_token });
//       client.set("access_token", token.access_token);
//       client.set("refresh_token", token.refresh_token);
//       return { access_token: token.access_token, refresh_token: token.refresh_token };
//     }
//   });
// };
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom-error.model";

/**
 * verifyToken is an middleware function
 * this function compares the user_id with the jwt user_id
 *  to check if the user is trying to get other user data
 * @param secret this is the jwt secret from the .env variables
 */

export const verifyToken = (secret: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "undefined") return next(CustomError.forbidden("Forbidden"));

    const user_id = req.body.user_id || req.params.user_id || req.query.user_id;
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, secret, (err: any, decoded: any) => {
      if (err) return next(CustomError.forbidden("Token has expired or invalid secret"));
      const current_id = decoded._id;
      console.log(req.body);

      console.log(current_id, user_id);

      if (current_id !== user_id) next(CustomError.unauthorized("Can't access other users data"));
      req.token = decoded;
      next();
    });
  };
};
