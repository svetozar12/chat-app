import { Router } from "express";
import Auth from "../../middlewares/useAuth";
import AuthController from "./AuthController";
import errorHandler from "../../utils/error-helper";
import { constants } from "../../constants";

const route = Router();

route.post("/login", errorHandler(AuthController.Login));
route.post("/refresh/:user_id", Auth(constants.REFRESH_TOKEN as string), errorHandler(AuthController.RefreshToken));
route.post("/logout/:user_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(AuthController.Logout));

export { route as AuthRoute };
