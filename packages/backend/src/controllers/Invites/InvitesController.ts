import { NextFunction, Request, Response } from "express";
import Invites from "../../models/Invites.model";
import User from "../../models/User.model";
import Chats from "../../models/chatRoom.model";
import { CustomError } from "../../models/custom-error.model";

interface IInviteController {
  GetInvitesByReciever: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  GetInvitesByInviter: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateInvite: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateInvite: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateGroupChat: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

const InvitesController: IInviteController = {
  GetInvitesByReciever: async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.id;
    const status = req.query.status as string;
    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: name,
            status,
          })
        : await Invites.find({
            reciever: name,
          }).select("status inviter reciever");

    if (!invites || invites.length <= 0) {
      return next(CustomError.notFound("You don't have invites"));
    }

    return res.status(200).json({ invites });
  },

  GetInvitesByInviter: async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.id;
    const status = req.query.status as string;

    const invites =
      status !== undefined
        ? await Invites.find({
            inviter: name,
            status,
          })
        : await Invites.find({
            inviter: name,
          }).select("status inviter reciever");

    if (!invites || invites.length <= 0) return next(CustomError.notFound("You don't have accepted invites"));

    return res.status(200).json({ invites });
  },

  CreateInvite: async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({
      username: req.body.reciever,
    }).exec();

    if (!user) return next(CustomError.notFound("User not found !"));

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      $or: [{ status: "recieved" }, { status: "accepted" }],
    });

    if (checkInviteInstance) return next(CustomError.conflict("Invite is already sent !"));
    if (req.body.reciever === req.body.inviter) return next(CustomError.conflict("Can't send invites to yourself !"));

    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: req.body.status,
    });
    await invites.save();

    return res.status(201).json({ message: invites });
  },
  UpdateInvite: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const status = req.body.status;
    const inviteInstance = await Invites.findOne({
      id,
    }).exec();

    if (!inviteInstance || !status) return next(CustomError.notFound("Invites not found !"));

    const updateStatus = await Invites.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
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
    return res.status(201).json({ message: "group-chat was created", Message: chat });
  },
};

export default InvitesController;
