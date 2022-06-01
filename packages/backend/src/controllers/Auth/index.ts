import { Router } from "express";
import { verifyToken } from "../../middlewares/useAuth";
import AuthController from "./AuthController";
import errorHandler from "../../utils/error-helper";
import { constants } from "../../constants";

const route = Router();

route.post("/login", errorHandler(AuthController.Login));
route.post("/refresh/:user_id", verifyToken(constants.REFRESH_TOKEN as string), errorHandler(AuthController.RefreshToken));

export { route as AuthRoute };
