import { RequestHandler } from "express";

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
