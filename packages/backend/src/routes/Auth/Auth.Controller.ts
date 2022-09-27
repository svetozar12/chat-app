import Auth from '../../middlewares/Auth';
import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import errorHandler from '../../utils/error-helper';
import AuthService from './Auth.Service';
import { LoginSchema } from './schema';
import * as Schema from '../../common/schema';
import { jwtEnv } from '../../config/env';

const authService = new AuthService();

const AuthController: IBaseController[] = [
  {
    type: RequestTypes.POST,
    route: '/login',
    handler: errorHandler(authService.Login),
    preMethods: [Validator(LoginSchema, 'body')],
  },
  {
    type: RequestTypes.POST,
    route: '/refresh/:user_id',
    handler: errorHandler(authService.RefreshToken),
    preMethods: [Validator(Schema.UserIdSchema, 'params'), Auth(jwtEnv.JWT_REFRESH_SECRET)],
  },
  {
    type: RequestTypes.POST,
    route: '/logout/:user_id',
    handler: errorHandler(authService.Logout),
    preMethods: [Validator(Schema.UserIdSchema, 'params'), Auth(jwtEnv.JWT_SECRET)],
  },
];

export default AuthController;
