import { jwtEnv } from '../../config/env';
import Auth from '../../middlewares/Auth';
import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import * as Schemas from '../../common/schema';
import errorHandler from '../../utils/error-helper';
import UsersService from './Users.Service';
import { CreateUserSchema, UpdateUserSchema } from './schema';
import upload from '../../utils/image_helper';

const usersService = new UsersService();

const UsersController: IBaseController[] = [
  {
    type: RequestTypes.GET,
    route: '/',
    handler: errorHandler(usersService.GetUserList),
  },
  {
    type: RequestTypes.GET,
    route: '/:user_id',
    handler: errorHandler(usersService.GetUser),
    preMethods: [Validator(Schemas.UserIdSchema, 'params')],
  },
  {
    type: RequestTypes.POST,
    route: '/',
    handler: errorHandler(usersService.CreateUser),
    preMethods: [Validator(CreateUserSchema, 'body')],
  },
  {
    type: RequestTypes.PUT,
    route: '/:user_id',
    handler: errorHandler(usersService.UpdateUser),
    preMethods: [
      Validator(Schemas.UserIdSchema, 'params'),
      Validator(UpdateUserSchema, 'body'),
      Auth(jwtEnv.JWT_SECRET),
      upload.single('userAvatar'),
    ],
  },
  {
    type: RequestTypes.DELETE,
    route: '/:user_id',
    handler: errorHandler(usersService.DeleteUser),
    preMethods: [Validator(Schemas.UserIdSchema, 'params'), Auth(jwtEnv.JWT_SECRET)],
  },
];

export default UsersController;
