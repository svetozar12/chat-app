import { jwtEnv } from '../../config/env';
import Auth from '../../middlewares/Auth';
import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import MessagesService from './Messages.Service';
import { CreateMessageSchema, GetMessagesSchema, UpdateMessageSchema } from './schema';
import * as Schemas from '../../common/schema';
import errorHandler from '../../utils/error-helper';

const messagesService = new MessagesService();

const MessagesController: IBaseController[] = [
  {
    type: RequestTypes.GET,
    route: '/:chat_id',
    handler: errorHandler(messagesService.GetMessage),
    preMethods: [Validator(Schemas.ChatIdSchema, 'params'), Validator(GetMessagesSchema, 'query'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.POST,
    route: '/:chat_id',
    handler: errorHandler(messagesService.CreateMessage),
    preMethods: [Validator(Schemas.ChatIdSchema, 'params'), Validator(CreateMessageSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.PUT,
    route: '/:_id',
    handler: errorHandler(messagesService.UpdateMessage),
    preMethods: [Validator(Schemas.DefaultIdSchema, 'params'), Validator(UpdateMessageSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.DELETE,
    route: '/:_id',
    handler: errorHandler(messagesService.DeleteMessage),
    preMethods: [Validator(Schemas.DefaultIdSchema, 'params'), Validator(Schemas.UserIdSchema, 'query'), Auth(jwtEnv.JWT_SECRET)],
  },
];

export default MessagesController;
