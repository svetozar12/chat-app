import { Router } from "express";
import Auth from "../../middlewares/Auth";
import AuthController from "./AuthController";
import { constants } from "../../constants";
// validation/error-handling
import Validator from "../../middlewares/Validator";
import * as Schema from "../../common/schema";
import { LoginSchema } from "./schema";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.post("/login", Validator(LoginSchema, "body"), errorHandler(AuthController.Login));
route.post(
  "/refresh/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Auth(constants.REFRESH_TOKEN as string),
  errorHandler(AuthController.RefreshToken),
);
route.post(
  "/logout/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(AuthController.Logout),
);

export { route as AuthRoute };
