import { Router } from "express";
import InvitesController from "./InvitesController";
import errorHandler from "../../utils/error-helper";

const route = Router();

route.get("/:id", errorHandler(InvitesController.GetInvitesByReciever));
route.get("/inviter/:id", errorHandler(InvitesController.GetInvitesByInviter));
route.post("/", errorHandler(InvitesController.CreateInvite));
route.put("/", errorHandler(InvitesController.UpdateInvite));
route.post("/group-chat", errorHandler(InvitesController.CreateGroupChat));

export { route as InvitesRoute };
