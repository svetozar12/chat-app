import { Router } from "express";
import InvitesController from "./InvitesController";
import errorHandler from "../../utils/error-helper";
import { verifyToken } from "../../middlewares/useAuth";
import { constants } from "../../constants";

const route = Router();

route.get("/:id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.GetInvitesByReciever));
route.get("/inviter/:id", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.GetInvitesByInviter));
route.post("/", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.CreateInvite));
route.put("/", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.UpdateInvite));
route.post("/group-chat", verifyToken(constants.ACCESS_TOKEN as string), errorHandler(InvitesController.CreateGroupChat));

export { route as InvitesRoute };
