import * as express from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/User.model";
import authSchema from "../helpers/schema";
import { Request, Response } from "express";
import { verifyToken, signToken } from "../helpers/jwt_helper";
const route = express.Router();
const ACCESS_TOKEN: any = process.env.JWT_SECRET;
const REFRESH_TOKEN: any = process.env.JWT_REFRESH_SECRET;
route.get("/user", verifyToken, async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, ACCESS_TOKEN, (err: any, authData: any) => {
      if (err) {
        return res.status(403).json({ Message: "Token has expired" });
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
    if (!user_db)
      //check if user doesnt exist in the db
      return res.status(400).json({ message: "User not registered" });

    const isMatch = await user_db.isValidPassword(result.password);

    if (!isMatch)
      //check if password of the user is valid doesnt exist in the db
      return res.status(401).json({ message: "Username/password not valid" });

    const user: { username: string; password: string } = {
      username,
      password,
    };
    const access = await signToken(user, ACCESS_TOKEN, "1h");
    const refresh = await signToken(user, REFRESH_TOKEN, "1y");
    return res
      .status(201)
      .json({ Access_token: access, Refresh_token: refresh });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

// route.post("/refresh", (req, res) => {
//   try {
//     jwt.verify(req.token, REFRESH_TOKEN, (err: any, authData: any) => {
//       if (err) {
//         return res.status(403).json({ Message: "Token has expired" });
//       } else {
//         return res.json({
//           authData,
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(501).json({
//       ErrorMsg: (error as Error).message,
//       Error: "Internal server error",
//       Message: "Something went wrong while deleting",
//     });
//   }
// });

export { route as auth };
