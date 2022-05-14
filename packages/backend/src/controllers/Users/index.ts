import { Router } from "express";
import UsersController from "./UsersController";
import upload from "../../utils/image_helper";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.get("/:username", errorHandler(UsersController.GetUser));
route.post("/", errorHandler(UsersController.CreateUser));
route.put("/:_id", upload.single("userAvatar"), errorHandler(UsersController.UpdateUser));
route.delete("/:username", errorHandler(UsersController.DeleteUser));

export { route as UsersRoute };
