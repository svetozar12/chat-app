import { Router } from "express";
import UsersController from "./UsersController";
import upload from "../../utils/image_helper";
import errorHandler from "../../utils/error-helper";
import { verifyToken } from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:user_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(UsersController.GetUser));
route.post("/", errorHandler(UsersController.CreateUser));
route.put(
  "/:user_id",
  verifyToken(constants.ACCESS_TOKEN as string),
  upload.single("userAvatar"),
  errorHandler(UsersController.UpdateUser),
);
route.delete("/:user_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(UsersController.DeleteUser));

export { route as UsersRoute };
