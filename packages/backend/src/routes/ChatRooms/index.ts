import { Router } from 'express';
import ChatRoomController from './ChatRoomController';
import errorHandler from '../../utils/error-helper';
import Auth from '../../middlewares/Auth';
import { constants } from '../../constants';
// validation
import * as Schemas from '../../common/schema';
import Validator from '../../middlewares/Validator';
import { CreateChatSchema, UpdateChatSchema } from './schema';

const route = Router();

route.get(
  '/:chat_id',
  Validator(Schemas.ChatIdSchema, 'params'),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(ChatRoomController.GetChatRoom),
);
route.get(
  '/',
  Validator(Schemas.UserIdSchema, 'query'),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(ChatRoomController.GetChatRooms),
);
route.post('/', Validator(CreateChatSchema, 'body'), errorHandler(ChatRoomController.CreateChatRoom));
route.put(
  '/:chat_id',
  Validator(Schemas.ChatIdSchema, 'params'),
  Validator(UpdateChatSchema, 'body'),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(ChatRoomController.UpdateChatRoom),
);
route.delete(
  '/:chat_id',
  Validator(Schemas.ChatIdSchema, 'params'),
  Validator(Schemas.UserIdSchema, 'body'),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(ChatRoomController.DeleteChatRoom),
);

export { route as ChatRoomsRoute };
