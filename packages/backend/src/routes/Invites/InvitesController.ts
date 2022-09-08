import { NextFunction, Request, Response } from "express";
import Invites from "../../models/Invites.model";
import User from "../../models/User.model";
import Chats from "../../models/chatRoom.model";
import { CustomError } from "../../utils/custom-error.model";

interface IInviteController {
  GetInvitesByReciever: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  GetInvitesByInviter: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateInvite: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateInvite: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateGroupChat: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

const InvitesController: IInviteController = {
  GetInvitesByReciever: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.user_id;
    const user = await User.findById(_id);
    if (!user) return next(CustomError.notFound("User doesn't exist"));

    const status = req.query.status as string;
    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: user.username,
            status,
          })
        : await Invites.find({
            reciever: user.username,
          }).select("status inviter reciever");

    if (!invites || invites.length <= 0) {
      return next(CustomError.notFound("You don't have invites"));
    }

    return res.status(200).json({ data: invites });
  },

  GetInvitesByInviter: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.user_id;
    const user = await User.findById(_id);
    if (!user) return next(CustomError.notFound("User doesn't exist"));

    const status = req.query.status as string;

    const invites =
      status !== undefined
        ? await Invites.find({
            inviter: user.username,
            status,
          })
        : await Invites.find({
            inviter: user.username,
          }).select("status inviter reciever");

    if (!invites || invites.length <= 0) return next(CustomError.notFound("You don't have accepted invites"));

    return res.status(200).json({ data: invites });
  },

  CreateInvite: async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({
      _id: req.body.user_id,
    }).exec();

    const reciever = await User.findOne({
      username: req.body.reciever,
    }).exec();

    if (!user || !reciever) return next(CustomError.notFound("User not found !"));

    const checkInviteInstance = await Invites.findOne({
      reciever: reciever.username,
      inviter: user.username,
      $or: [{ status: "recieved" }, { status: "accepted" }],
    });

    if (req.body.reciever === user.username) return next(CustomError.conflict("Can't send invites to yourself !"));
    if (checkInviteInstance) return next(CustomError.conflict("Invite is already sent !"));

    const invites = await new Invites({
      user_id: [user._id, reciever._id],
      reciever: req.body.reciever,
      inviter: user.username,
      status: "recieved",
    });
    await invites.save();

    return res.status(201).json({ data: invites });
  },
  UpdateInvite: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.invite_id;
    const status = req.body.status;
    const user_id = req.body.user_id;

    const inviteInstance = await Invites.findOne({
      id,
      user_id,
    }).exec();

    if (!inviteInstance || !status) return next(CustomError.notFound("Invites not found !"));

    const updateStatus = await Invites.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ data: updateStatus });
  },

  CreateGroupChat: async (req: Request, res: Response, next: NextFunction) => {
    const usersData = req.body.usersData;
    for (const userData of usersData) {
      if ((await User.findOne({ username: userData })) === null) return next(CustomError.notFound(`User ${userData} not found`));
    }

    const chat = await new Chats({
      members: usersData,
    });

    await chat.save();
    return res.status(201).json({ Message: "group-chat was created", data: chat });
  },
};

export default InvitesController;
