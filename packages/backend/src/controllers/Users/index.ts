import { Router } from "express";
import UsersController from "./UsersController";
import upload from "../../utils/image_helper";
import errorHandler from "../../utils/error-helper";
import Auth from "../../middlewares/Auth";
import { constants } from "../../constants";
// validation
import Validator from "../../middlewares/Validator";
import * as Schema from "../../common/schema";
import { UpdateUserSchema, CreateUserSchema } from "./schema";

const route = Router();

route.get(
  "/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(UsersController.GetUser),
);
route.post("/", Validator(CreateUserSchema, "body"), errorHandler(UsersController.CreateUser));
route.put(
  "/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Validator(UpdateUserSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  upload.single("userAvatar"),
  errorHandler(UsersController.UpdateUser),
);
route.delete(
  "/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(UsersController.DeleteUser),
);

export { route as UsersRoute };
