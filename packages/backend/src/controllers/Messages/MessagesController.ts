import { Request, Response, NextFunction } from "express";
import { Schema } from "mongoose";
import Messages from "../../models/Message.model";
import User from "../../models/User.model";
import { CustomError } from "../../utils/custom-error.model";

interface IMessageController {
  GetMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  DeleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

const MessageController: IMessageController = {
  GetMessage: async (req: Request, res: Response, next: NextFunction) => {
    const page_size = Number(req.query.page_size) || 2;
    const page_number = Number(req.query.page_number) || 1;
    const chat_id = req.params.chat_id;

    const messages = await Messages.find({ chatInstance: chat_id, user_id: req.query.user_id as unknown as Schema.Types.ObjectId })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: "desc" });

    if (messages.length <= 0 || !messages) return next(CustomError.notFound("You don't have messages."));
    const reversedArr = messages.reverse();
    return res.status(200).json({ Message: "You have messages.", data: reversedArr });
  },

  CreateMessage: async (req: Request, res: Response, next: NextFunction) => {
    const chat_id = req.params.chat_id;
    const sender_id = req.body.user_id;
    const message = req.body.message;

    const sender = await User.findById(sender_id);
    if (!sender) return next(CustomError.notFound("User not found"));
    const messages = await new Messages({
      user_id: req.body.user_id,
      chat_id,
      sender: sender.username,
      message,
      seenBy: [],
    });
    if (!message) return next(CustomError.badRequest(message));

    await messages.save();
    return res.status(201).json({ data: messages });
  },

  UpdateMessage: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id;
    const newMessage: string = req.body.newMessage;
    if (newMessage === "" || newMessage === null) return res.status(200).json({ Message: "Message didn't change" });
    const message = await Messages.findOneAndUpdate({ _id, user_id: req.body.user_id }, { message: newMessage }).exec();
    if (!message) return next(CustomError.notFound("Message wasn't found !"));
    return res.status(200).json({ Message: `Message has been updated` });
  },

  DeleteMessage: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id;
    const message = await Messages.findOneAndDelete({ _id, user_id: req.body.user_id }).exec();
    if (!message) return next(CustomError.notFound("Message wasn't found !"));
    return res.status(200).json({ Message: `Message has been deleted` });
  },
};

export default MessageController;
