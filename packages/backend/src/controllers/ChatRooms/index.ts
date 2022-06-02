import { Router } from "express";
import ChatRoomController from "./ChatRoomController";
import errorHandler from "../../utils/error-helper";
import Auth from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:user_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(ChatRoomController.GetChatRoom));
route.get("/", Auth(constants.ACCESS_TOKEN as string), errorHandler(ChatRoomController.GetChatRooms));
route.post("/", errorHandler(ChatRoomController.CreateChatRoom));
route.put("/:chat_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(ChatRoomController.UpdateChatRoom));
route.delete("/:chat_id", Auth(constants.ACCESS_TOKEN as string), errorHandler(ChatRoomController.DeleteChatRoom));

export { route as ChatRoomsRoute };
