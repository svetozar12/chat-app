import { Router } from "express";
import InvitesController from "./InvitesController";
import errorHandler from "../../utils/error-helper";
import { verifyToken } from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:user_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.GetInvitesByReciever));
route.get("/inviter/:user_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.GetInvitesByInviter));
route.post("/", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.CreateInvite));
route.put("/:invite_id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.UpdateInvite));
route.post("/group-chat", errorHandler(InvitesController.CreateGroupChat));

export { route as InvitesRoute };
