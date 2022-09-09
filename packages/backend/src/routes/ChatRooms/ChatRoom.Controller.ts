import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import errorHandler from '../../utils/error-helper';
import * as Schemas from '../../common/schema';
import ChatRoomService from './ChatRoom.Service';
import Auth from '../../middlewares/Auth';
import { jwtEnv } from '../../config/env';
import { CreateChatSchema, UpdateChatSchema } from './schema';

const chatRoomService = new ChatRoomService();

const ChatRoomController: IBaseController[] = [
  {
    type: RequestTypes.GET,
    route: '/:chat_id',
    handler: errorHandler(chatRoomService.GetChatRoom),
    preMethods: [Validator(Schemas.ChatIdSchema, 'params'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.GET,
    route: '/',
    handler: errorHandler(chatRoomService.GetChatRooms),
    preMethods: [Validator(Schemas.UserIdSchema, 'query'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.POST,
    route: '/',
    handler: errorHandler(chatRoomService.CreateChatRoom),
    preMethods: [Validator(CreateChatSchema, 'body')],
  },
  {
    type: RequestTypes.PUT,
    route: '/:chat_id',
    handler: errorHandler(chatRoomService.UpdateChatRoom),
    preMethods: [Validator(Schemas.ChatIdSchema, 'params'), Validator(UpdateChatSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.DELETE,
    route: '/:chat_id',
    handler: errorHandler(chatRoomService.UpdateChatRoom),
    preMethods: [Validator(Schemas.ChatIdSchema, 'params'), Validator(Schemas.UserIdSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
];

export default ChatRoomController;
