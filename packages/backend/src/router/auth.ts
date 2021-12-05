import "dotenv/config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/User.model";
import authSchema from "../helpers/schema";
import { Request, Response } from "express";
import { Secret, GetPublicKeyOrSecret } from "jsonwebtoken";
import { verifyToken } from "../helpers/jwt_helper";
const route = express.Router();

const secretKey: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET;

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
    const result = await authSchema.validateAsync(req.body);
    const user_db = await User.findOne({ username: result.username });
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.query.rememberMe;
    if (!user_db)
      //check if user doesnt exist in the db
      return res.status(400).json({ message: "User not registered" });

    const isMatch = await user_db.isValidPassword(result.password);

    if (!isMatch)
      //check if password of the user is valid doesnt exist in the db
      return res.status(401).json({ message: "Username/password not valid" });

    const user = {
      username,
      password,
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
