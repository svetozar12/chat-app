import { NextFunction, Request, Response } from "express";
import User from "../../models/User.model";
import { updateFormSchema } from "../../utils/schema";
import signTokens from "../../utils/signToken";
import { CustomError } from "../../models/custom-error.model";
import { constants } from "../../constants";

interface IAuthController {
  Login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  RefreshToken: (req: Request, res: Response) => Promise<any>;
}

const AuthController: IAuthController = {
  Login: async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateFormSchema.validateAsync(req.body);
    const user_db = await User.findOne({ username: result.username });
    const remember_me: boolean = req.query.remember_me === `true`;

    if (!result) return next(CustomError.conflict("Invalid body"));
    if (!user_db) return next(CustomError.badRequest(`User: ${result.username} is not registered`));

    const _id = user_db._id;
    const username = req.body.username;
    const password = req.body.password;

    const user: { _id: string; username: string; password: string } = {
      _id,
      username,
      password,
    };

    const expire = {
      access: remember_me ? "1y" : "1h",
      refresh: remember_me ? "2y" : "2h",
    };

    const isMatch = await user_db.isValidPassword(result.password);

    if (!isMatch) return next(CustomError.unauthorized("Password is not valid"));

    const access = await signTokens(user, constants.ACCESS_TOKEN || "", expire.access);
    const refresh = await signTokens(user, constants.REFRESH_TOKEN || "", expire.refresh);

    return res.status(201).json({ user_id: _id, Access_token: access, Refresh_token: refresh });
  },

  RefreshToken: async (req, res) => {
    const remember_me: boolean = req.query.remember_me === `true`;
    const refresh: any = req.token;

    if (refresh) {
      const user = {
        _id: refresh._id,
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
        user_id: refresh._id,
        Access_token: accessToken,
        Refresh_token: refreshToken,
      });
    }
  },
};

export default AuthController;
