import { Router } from "express";
import MessageController from "./MessagesController";
import errorHandler from "../../utils/error-helper";
import Auth from "../../middlewares/Auth";
import { constants } from "../../constants";
// validation
import * as Schema from "../../common/schema";
import Validator from "../../middlewares/Validator";
import { CreateMessageSchema, GetMessagesSchema, UpdateMessageSchema } from "./schema";

const route = Router();

route.get(
  "/:chat_id",
  Validator(Schema.ChatIdSchema, "params"),
  Validator(GetMessagesSchema, "query"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(MessageController.GetMessage),
);
route.post(
  "/:chat_id",
  Validator(Schema.ChatIdSchema, "params"),
  Validator(CreateMessageSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(MessageController.CreateMessage),
);
route.put(
  "/:_id",
  Validator(Schema.DefaultIdSchema, "params"),
  Validator(UpdateMessageSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(MessageController.UpdateMessage),
);
route.delete(
  "/:_id",
  Validator(Schema.DefaultIdSchema, "params"),
  Validator(Schema.UserIdSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(MessageController.DeleteMessage),
);

export { route as MessagesRoute };
