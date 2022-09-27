import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import signTokens from '../../utils/signToken';
import { CustomError } from '../../utils/custom-error.model';
import { client } from '../../config/nosql/redis_config';
import TokenSession from '../../models/TokenSession.model';
import { jwtEnv } from '../../config/env';
import { resMessages } from '../../common/constants';

class AuthService {
  public async Login(req: Request, res: Response, next: NextFunction) {
    const user_db = await User.findOne({ username: req.body.username });
    const remember_me: boolean = req.query.remember_me === `true`;

    if (!user_db) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    const isMatch = await user_db.isValidPassword(req.body.password);
    if (!isMatch) return next(CustomError.unauthorized(resMessages.auth.INVALID_PASSWORD));

    const _id = user_db._id;
    const username = req.body.username;
    const password = req.body.password;

    const user: { _id: any; username: string; password: string } = {
      _id,
      username,
      password,
    };

    const expire = {
      access: remember_me ? '2h' : '1h',
      refresh: remember_me ? '30d' : '1d',
    };

    const AccessToken = await signTokens(user, jwtEnv.JWT_SECRET, expire.access);
    const RefreshToken = await signTokens(user, jwtEnv.JWT_REFRESH_SECRET, expire.refresh);

    return res.status(201).json({ userId: _id, AccessToken, RefreshToken });
  }
  async RefreshToken(req: Request, res: Response) {
    const remember_me: boolean = req.query.remember_me === `true`;
    const refresh: any = req.token;

    if (refresh) {
      const user = {
        _id: refresh._id,
        username: refresh.username,
        password: refresh.password,
      };

      const expire: { access: string; refresh: string } = {
        access: remember_me ? '2h' : '1h',
        refresh: remember_me ? '30d' : '1d',
      };

      const AccessToken = await signTokens(user, jwtEnv.JWT_SECRET, expire.access);
      const RefreshToken = await signTokens(user, jwtEnv.JWT_REFRESH_SECRET, expire.refresh);

      return res.status(201).json({ userId: refresh._id, AccessToken, RefreshToken });
    }
  }
  async Logout(req: Request, res: Response, next: NextFunction) {
    const sessions = await TokenSession.find({ user_id: req.params.user_id });

    if (sessions.length <= 0) return next(CustomError.notFound(resMessages.auth.NOT_FOUND_SESSION));
    for await (const item of sessions) {
      await client.SET(`token_${item.token}`, item.token);
      await client.EXPIRE(`token_${item.token}`, item.expireAfter);
    }
    await TokenSession.deleteMany({ user_id: req.params.user_id });

    return res.json({ Message: resMessages.common.SUCCESFUL });
  }
}

export default AuthService;
