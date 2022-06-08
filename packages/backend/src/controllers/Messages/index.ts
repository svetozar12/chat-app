import { Router } from "express";
import MessageController from "./MessagesController";
import errorHandler from "../../utils/error-helper";
import { verifyToken } from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:chat_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(MessageController.GetMessage));
route.post("/:chat_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(MessageController.CreateMessage));
route.put("/:_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(MessageController.UpdateMessage));
route.delete("/:_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(MessageController.DeleteMessage));

export { route as MessagesRoute };
