import { NextFunction, Request, Response } from 'express';
import Invites from '../../models/Invites.model';
import User from '../../models/User.model';
import Chats from '../../models/chatRoom.model';
import { CustomError } from '../../utils/custom-error.model';
import { resMessages } from '../../common/constants';

class InvitesService {
  async GetInvitesByReciever(req: Request, res: Response, next: NextFunction) {
    const invitesReqObj = {
      userId: req.params.user_id,
      status: req.query.status,
    };
    const { userId, status } = invitesReqObj;

    const user = await User.findById(userId);
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: user.username,
            status,
          })
        : await Invites.find({
            reciever: user.username,
          }).select('status inviter reciever');

    if (invites.length <= 0) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    return res.status(200).json(invites);
  }

  async GetInvitesByInviter(req: Request, res: Response, next: NextFunction) {
    const invitesReqObj = {
      userId: req.params.user_id,
      status: req.query.status,
    };
    const { userId, status } = invitesReqObj;

    const user = await User.findById(userId);
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const invites =
      status !== undefined
        ? await Invites.find({
            inviter: user.username,
            status,
          })
        : await Invites.find({
            inviter: user.username,
          }).select('status inviter reciever');

    if (invites.length <= 0) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    return res.status(200).json(invites);
  }

  async CreateInvite(req: Request, res: Response, next: NextFunction) {
    const invitesReqObj = {
      userId: req.body.user_id,
      reciever: req.body.reciever,
    };
    const { userId, reciever } = invitesReqObj;

    const inviteSender = await User.findOne({
      _id: userId,
    }).exec();

    const inviteReciever = await User.findOne({
      username: reciever,
    }).exec();

    if (!inviteSender || !inviteReciever) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const checkInviteInstance = await Invites.findOne({
      reciever: inviteReciever.username,
      inviter: inviteSender.username,
      $or: [{ status: 'recieved' }, { status: 'accepted' }],
    });

    if (req.body.reciever === inviteSender.username) return next(CustomError.conflict(resMessages.invite.CANT_SEND_TO_YOURSELF));
    if (checkInviteInstance) return next(CustomError.conflict(resMessages.invite.CONFLICT));

    const invites = await new Invites({
      user_id: [inviteSender._id, inviteReciever._id],
      reciever: inviteReciever.username,
      inviter: inviteSender.username,
      status: 'recieved',
    });

    await invites.save();
    return res.status(201).json(invites);
  }
  async UpdateInvite(req: Request, res: Response, next: NextFunction) {
    const invitesReqObj = {
      inviteId: req.params.invite_id,
      userId: req.body.user_id,
      status: req.body.status,
    };
    const { userId, inviteId, status } = invitesReqObj;

    const chatInvite = await Invites.findOne({
      _id: inviteId,
      user_id: userId,
    }).exec();

    if (!chatInvite) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    const updatedInvite = await Invites.findByIdAndUpdate(
      inviteId,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json(updatedInvite);
  }

  async CreateGroupChat(req: Request, res: Response, next: NextFunction) {
    const members = req.body.usersData;
    for (const userData of members) {
      if ((await User.findOne({ username: userData })) === null) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    }

    const chat = await new Chats({
      members,
    });

    await chat.save();
    return res.status(201).json(chat);
  }
}

export default InvitesService;
