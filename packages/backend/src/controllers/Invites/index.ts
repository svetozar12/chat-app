import { Router } from "express";
import InvitesController from "./InvitesController";
import errorHandler from "../../utils/error-helper";
import Auth from "../../middlewares/Auth";
import { constants } from "../../constants";
// validation
import * as Schema from "../../common/schema";
import Validator from "../../middlewares/Validator";
import { CreateGroupChat, CreateInviteSchema, GetInviteSchema, UpdateInviteSchema } from "./schema";
const route = Router();

route.get(
  "/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Validator(GetInviteSchema, "query"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(InvitesController.GetInvitesByReciever),
);
route.get(
  "/inviter/:user_id",
  Validator(Schema.UserIdSchema, "params"),
  Validator(GetInviteSchema, "query"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(InvitesController.GetInvitesByInviter),
);
route.post(
  "/",
  Validator(CreateInviteSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(InvitesController.CreateInvite),
);
route.put(
  "/:invite_id",
  Validator(Schema.InviteIdSchema, "params"),
  Validator(UpdateInviteSchema, "body"),
  Auth(constants.ACCESS_TOKEN as string),
  errorHandler(InvitesController.UpdateInvite),
);
route.post("/group-chat", Validator(CreateGroupChat, "body"), errorHandler(InvitesController.CreateGroupChat));

export { route as InvitesRoute };
