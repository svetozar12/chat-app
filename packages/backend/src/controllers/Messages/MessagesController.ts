import { Request, Response, NextFunction } from "express";
import Messages from "../../models/Message.model";
import { CustomError } from "../../models/custom-error.model";

interface IMessageController {
  GetMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  DeleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

const MessageController: IMessageController = {
  GetMessage: async (req: Request, res: Response, next: NextFunction) => {
    const page_size = Number(req.query.page_size);
    const page_number = Number(req.query.page_number);
    const chat_id = req.params.chat_id;
    const messages = await Messages.find({ chatInstance: chat_id })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: "desc" });

    if (messages.length <= 0 || !messages) return next(CustomError.notFound("You don't have messages."));
    const reversedArr = messages.reverse();
    return res.status(200).json({ message: "You have messages.", reversedArr });
  },

  CreateMessage: async (req: Request, res: Response, next: NextFunction) => {
    const chat_id = req.params.chat_id;
    const sender = req.body.sender;
    const message = req.body.message;

    const messages = await new Messages({
      chatInstance: chat_id,
      sender: sender,
      message: message,
      seenBy: [],
    });
    if (!message) return next(CustomError.badRequest(message));

    await messages.save();
    return res.status(201).json({ messages });
  },

  UpdateMessage: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id;
    const newMessage: string = req.body.newMessage;
    if (newMessage === "" || newMessage === null) return res.status(200).json({ message: "Message didn't change" });
    const user = Messages.findByIdAndUpdate(_id, { message: newMessage }).exec();
    if (!user) return next(CustomError.notFound("Message wasn't found !"));
    return res.status(200).send({ message: `Message has been updated` });
  },

  DeleteMessage: async (req: Request, res: Response, next: NextFunction) => {
    const message_id = req.params.message_id;
    const isMessage = await Messages.findOne({ _id: message_id });
    if (!isMessage) return next(CustomError.notFound("Message wasn`t found !"));
    await Messages.deleteOne({ _id: message_id }).exec();
    return res.status(200).json({ message: `Message  has been deleted` });
  },
};

export default MessageController;
