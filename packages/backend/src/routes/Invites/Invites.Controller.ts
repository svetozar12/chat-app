import Validator from '../../middlewares/Validator';
import { IBaseController, RequestTypes } from '../../utils/buildRoute';
import errorHandler from '../../utils/error-helper';
import * as Schemas from '../../common/schema';
import Auth from '../../middlewares/Auth';
import { jwtEnv } from '../../config/env';
import InvitesService from './Invites.Service';
import { CreateGroupChat, CreateInviteSchema, GetInviteSchema, UpdateInviteSchema } from './schema';

const invitesService = new InvitesService();

const InvitesController: IBaseController[] = [
  {
    type: RequestTypes.GET,
    route: '/:user_id',
    handler: errorHandler(invitesService.GetInvitesByReciever),
    preMethods: [Validator(Schemas.UserIdSchema, 'params'), Validator(GetInviteSchema, 'query'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.GET,
    route: '/inviter/:user_id',
    handler: errorHandler(invitesService.GetInvitesByInviter),
    preMethods: [Validator(Schemas.UserIdSchema, 'params'), Validator(GetInviteSchema, 'query'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.POST,
    route: '/',
    handler: errorHandler(invitesService.CreateInvite),
    preMethods: [Validator(CreateInviteSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.PUT,
    route: '/:invite_id',
    handler: errorHandler(invitesService.UpdateInvite),
    preMethods: [Validator(Schemas.InviteIdSchema, 'params'), Validator(UpdateInviteSchema, 'body'), Auth(jwtEnv.JWT_SECRET)],
  },
  {
    type: RequestTypes.POST,
    route: '/:chat_id',
    handler: errorHandler(invitesService.CreateGroupChat),
    preMethods: [Validator(CreateGroupChat, 'body')],
  },
];

export default InvitesController;
