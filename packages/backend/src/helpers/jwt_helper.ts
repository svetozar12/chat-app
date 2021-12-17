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
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, token) => {
      if (err) {
        reject(createError(403, "Token has expired"));
      }
      return resolve(token);
    });
  });
};
