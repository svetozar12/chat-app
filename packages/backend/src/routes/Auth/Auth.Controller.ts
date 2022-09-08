import { constants } from '../../constants';
import Auth from '../../middlewares/Auth';
import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import errorHandler from '../../utils/error-helper';
import AuthService from './Auth.Service';
import { LoginSchema } from './schema';
import * as Schema from '../../common/schema';

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
    preMethods: [Validator(Schema.UserIdSchema, 'params'), Auth(constants.REFRESH_TOKEN as string)],
  },
  {
    type: RequestTypes.POST,
    route: '/logout/:user_id',
    handler: errorHandler(authService.Login),
    preMethods: [Validator(Schema.UserIdSchema, 'params'), Auth(constants.ACCESS_TOKEN as string)],
  },
];

export default AuthController;
