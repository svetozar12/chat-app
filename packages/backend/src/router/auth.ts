import * as express from "express";
import { Request, Response } from "express";
import type { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
require("dotenv").config();
const route = express.Router();

const verifyToken: RequestHandler = (req: any, res, next) => {
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
const secretKey: jwt.Secret = process.env.JWT_SECRET;

route.get("/user", verifyToken, async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, secretKey, (err: any, authData: any) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        return res.json({
          authData,
        });
      }
    });

    return res.status(200);
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while loging",
    });
  }
});

route.post("/login", async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const rememberMe = req.query.rememberMe;
    console.log(req.body);

    const user = {
      username,
    };
    jwt.sign(
      { user },
      secretKey,
      { expiresIn: rememberMe ? "3y" : "1h" },
      (err, token) => {
        if (err) res.status(403); //Unauthorized 403
        return res
          .json({
            token,
          })
          .status(201);
      },
    );
  } catch (error) {
    return res.status(403).json({
      //Unauthorized 403
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { route as auth };
