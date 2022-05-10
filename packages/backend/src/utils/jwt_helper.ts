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
import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import * as createError from "http-errors";
export const verifyToken: RequestHandler = (req: any, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    //if bearer Header isn't undefined seperates JWT from Bearer and later on use method jwt.verify() to verify the jwt
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

export const signTokens = (
  data: {
    username: string;
    password: string;
  },
  secret: string,
  expires: string,
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, { expiresIn: expires }, (err, token) => {
      if (err) {
        return reject(createError(403, "Token has expired"));
      }
      return resolve(token);
    });
  });
};

export const verifyTokens = (token: string, secret: string) => {
  console.log(secret);

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, Token) => {
      if (err) {
        console.log(err);

        reject(createError(403, "Token has expired"));
      }
      return resolve(Token);
    });
  });
};
