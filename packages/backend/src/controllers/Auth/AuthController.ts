import { NextFunction, Request, Response } from "express";
import User from "../../models/User.model";
import { updateFormSchema } from "../../utils/schema";
import { signTokens, verifyTokens } from "../../utils/jwt_helper";
import { CustomError } from "../../models/custom-error.model";
import { constants } from "../../constants";

interface IAuthController {
  GetUser: (req: any, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  Login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  RefreshToken: (req: any, res: any) => Promise<any>;
}

const AuthController: IAuthController = {
  GetUser: async (req: any, res: Response, next: NextFunction) => {
    const response = await verifyTokens(req.token, constants.ACCESS_TOKEN || "");
    if (!response) return next(CustomError.notFound("You don't have chat rooms"));
    return res.status(200).json({ authData: response });
  },

  Login: async (req: Request, res: Response, next: NextFunction) => {
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

    if (!result) return next(CustomError.conflict("Invalid body"));
    if (!user_db) return next(CustomError.badRequest(`User: ${result.username} is not registered`));

    const isMatch = await user_db.isValidPassword(result.password);

    if (!isMatch) return next(CustomError.unauthorized("Password is not valid"));

    const access = await signTokens(user, constants.ACCESS_TOKEN || "", expire.access);
    const refresh = await signTokens(user, constants.REFRESH_TOKEN || "", expire.refresh);

    return res.status(201).json({ Access_token: access, Refresh_token: refresh });
  },

  RefreshToken: async (req, res) => {
    const refresh_token = req.body.refresh_token;
    const remember_me: boolean = req.query.remember_me === `true`;
    const refresh: any = await verifyTokens(refresh_token, constants.REFRESH_TOKEN || "");

    if (refresh) {
      const user = {
        username: refresh.username,
        password: refresh.password,
      };

      const expire: { access: string; refresh: string } = {
        access: remember_me ? "1y" : "1h",
        refresh: remember_me ? "2y" : "2h",
      };

      const accessToken = await signTokens(user, constants.ACCESS_TOKEN || "", expire.access);
      const refreshToken = await signTokens(user, constants.REFRESH_TOKEN || "", expire.refresh);

      return res.status(201).json({
        username: refresh.username,
        Access_token: accessToken,
        Refresh_token: refreshToken,
      });
    }
  },
};

export default AuthController;
