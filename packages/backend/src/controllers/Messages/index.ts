import { Router } from "express";
import MessageController from "./MessagesController";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.get("/:chat_id", errorHandler(MessageController.GetMessage));
route.post("/:chat_id", errorHandler(MessageController.CreateMessage));
route.put("/:chat_id", errorHandler(MessageController.UpdateMessage));
route.delete("/:message_id", errorHandler(MessageController.DeleteMessage));

export { route as MessagesRoute };
