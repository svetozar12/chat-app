import { Router } from "express";
import ChatRoomController from "./ChatRoomController";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.get("/:user_id", errorHandler(ChatRoomController.GetChatRoom));
route.get("/", errorHandler(ChatRoomController.GetChatRooms));
route.post("/", errorHandler(ChatRoomController.CreateChatRoom));
route.put("/:chat_id", errorHandler(ChatRoomController.UpdateChatRoom));
route.delete("/:chat_id", errorHandler(ChatRoomController.DeleteChatRoom));

export { route as ChatRoomsRoute };
