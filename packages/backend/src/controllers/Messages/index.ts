import { Router } from "express";
import MessageController from "./MessagesController";
import errorHandler from "../../utils/error-helper";
import Auth from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:chat_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(MessageController.GetMessage));
route.post("/:chat_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(MessageController.CreateMessage));
route.put("/:_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(MessageController.UpdateMessage));
route.delete("/:_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(MessageController.DeleteMessage));

export { route as MessagesRoute };
