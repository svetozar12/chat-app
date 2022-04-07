import * as jwt from "jsonwebtoken";
import * as createError from "http-errors";
import jwtDecode from "jwt-decode";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.get("Authorization")) {
    next();
    return;
  }
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    //if bearer Header isn't undefined seperates JWT from Bearer and later on use method jwt.verify() to verify the jwt
    const decoded: { username: string; password: string; iat: number; exp: number } = jwtDecode(bearerToken);
    const compUser = req.params.user || req.body.user;
    if (decoded.username !== compUser) {
      return res.status(400).json("You don't have permissions to do that");
    }
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
