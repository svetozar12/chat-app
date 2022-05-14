import { Router } from "express";
import { verifyToken } from "../../utils/jwt_helper";
import AuthController from "./AuthController";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.get("/user", verifyToken, errorHandler(AuthController.GetUser));
route.post("/login", errorHandler(AuthController.Login));
route.post("/refresh", errorHandler(AuthController.RefreshToken));

export { route as AuthRoute };
