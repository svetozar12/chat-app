import { Request, Response, Router } from "express";
import User from "../models/User.model";
import { updateFormSchema } from "../utils/schema";
import { verifyToken, signTokens, verifyTokens } from "../utils/jwt_helper";

const AuthController = Router();
const ACCESS_TOKEN: string | undefined = process.env.JWT_SECRET;
const REFRESH_TOKEN: string | undefined = process.env.JWT_REFRESH_SECRET;

AuthController.get("/user", verifyToken, async (req: any, res: Response) => {
  try {
    const response = await verifyTokens(req.token, ACCESS_TOKEN || "");
    if (!response) res.json({ message: "BAD" }).status(403);
    return res.status(200).json({ authData: response });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: error as Error,
      Error: "Internal server error",
      Message: "Something went wrong while loging",
    });
  }
});

AuthController.post("/login", async (req: Request, res: Response) => {
  try {
    const result = await updateFormSchema.validateAsync(req.body);
    const user_db = await User.findOne({ username: result.username });

    const remember_me: boolean = req.query.remember_me === `true`;
    const username = req.body.username;
    const password = req.body.password;

    const user: { username: string; password: string } = {
      username,
      password,
    };

    const expire = {
      access: remember_me ? "1y" : "1h",
      refresh: remember_me ? "2y" : "2h",
    };

    if (!result) return res.status(409);

    if (!user_db) return res.status(400).json({ ErrorMsg: "User not registered" });

    const isMatch = await user_db.isValidPassword(result.password);

    if (!isMatch) return res.status(401).json({ ErrorMsg: "Password is not valid" });

    const access = await signTokens(user, ACCESS_TOKEN || "", expire.access);
    const refresh = await signTokens(user, REFRESH_TOKEN || "", expire.refresh);
    return res.status(201).json({ Access_token: access, Refresh_token: refresh });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

AuthController.post("/refresh", async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const remember_me: boolean = req.query.remember_me === `true`;
    const refresh: any = await verifyTokens(refresh_token, REFRESH_TOKEN || "");

    if (refresh) {
      const user = {
        username: refresh.username,
        password: refresh.password,
      };

      const expire: { access: string; refresh: string } = {
        access: remember_me ? "1y" : "1h",
        refresh: remember_me ? "2y" : "2h",
      };

      const accessToken = await signTokens(user, ACCESS_TOKEN || "", expire.access);
      const refreshToken = await signTokens(user, REFRESH_TOKEN || "", expire.refresh);
      return res.status(201).json({
        username: refresh.username,
        Access_token: accessToken,
        Refresh_token: refreshToken,
      });
    }
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { AuthController };
