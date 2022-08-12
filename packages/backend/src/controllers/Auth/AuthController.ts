import { NextFunction, Request, Response } from "express";
import User from "../../models/User.model";
import signTokens from "../../utils/signToken";
import { CustomError } from "../../utils/custom-error.model";
import { constants } from "../../constants";
import { client } from "../../config/redis_config";
import TokenSession from "../../models/TokenSession.model";

interface IAuthController {
  Login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  RefreshToken: (req: Request, res: Response) => Promise<any>;
  Logout: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}

const AuthController: IAuthController = {
  Login: async (req: Request, res: Response, next: NextFunction) => {
    const user_db = await User.findOne({ username: req.body.username });
    const remember_me: boolean = req.query.remember_me === `true`;

    // if (!result) return next(CustomError.conflict("Invalid body"));
    if (!user_db) return next(CustomError.badRequest(`User: ${req.body.username} is not registered`));

    const isMatch = await user_db.isValidPassword(req.body.password);
    if (!isMatch) return next(CustomError.unauthorized("Password is not valid"));

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

    const access = await signTokens(user, constants.ACCESS_TOKEN, expire.access);
    const refresh = await signTokens(user, constants.REFRESH_TOKEN, expire.refresh);

    return res.status(201).json({ data: { user_id: _id, Access_token: access, Refresh_token: refresh } });
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
        access: remember_me ? "2h" : "1h",
        refresh: remember_me ? "30d" : "1d",
      };

      const accessToken = await signTokens(user, constants.ACCESS_TOKEN || "", expire.access);
      const refreshToken = await signTokens(user, constants.REFRESH_TOKEN || "", expire.refresh);

      return res.status(201).json({
        data: { user_id: refresh._id, Access_token: accessToken, Refresh_token: refreshToken },
      });
    }
  },

  Logout: async (req, res, next) => {
    const sessions = await TokenSession.find({ user_id: req.params.user_id });

    if (sessions.length <= 0) return next(CustomError.notFound("You don't have sessions"));
    for await (const item of sessions) {
      console.log(item.expireAfter);
      await client.SET(`token_${item.token}`, item.token);
      await client.EXPIRE(`token_${item.token}`, item.expireAfter);
    }
    await TokenSession.deleteMany({ user_id: req.params.user_id });

    return res.json({ Message: "successful" });
  },
};

export default AuthController;
