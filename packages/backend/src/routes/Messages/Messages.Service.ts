import { NextFunction, Request, Response } from 'express';
import Messages from '../../models/Message.model';
import User from '../../models/User.model';
import { CustomError } from '../../utils/custom-error.model';

class MessagesService {
  async GetMessage(req: Request, res: Response, next: NextFunction) {
    const page_size = Number(req.query.page_size) || 2;
    const page_number = Number(req.query.page_number) || 1;
    const chat_id = req.params.chat_id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const messages = await Messages.find({ chat_id })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: 'desc' })
      .exec();

    if (messages.length <= 0 || !messages) return next(CustomError.notFound("You don't have messages."));
    const reversedArr = messages.reverse();
    return res.status(200).json({ Message: 'You have messages.', data: reversedArr });
  }

  async CreateMessage(req: Request, res: Response, next: NextFunction) {
    const chat_id = req.params.chat_id;
    const sender_id = req.body.user_id;
    const message = req.body.message;

    const sender = await User.findById(sender_id);
    if (!sender) return next(CustomError.notFound('User not found'));
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
  }

  async UpdateMessage(req: Request, res: Response, next: NextFunction) {
    const _id = req.params._id;
    const newMessage: string = req.body.newMessage;
    if (newMessage === '' || newMessage === null) return res.status(200).json({ Message: "Message didn't change" });
    const message = await Messages.findOneAndUpdate({ _id, user_id: req.body.user_id }, { message: newMessage }).exec();
    if (!message) return next(CustomError.notFound("Message wasn't found !"));
    return res.status(200).json({ Message: `Message has been updated` });
  }

  async DeleteMessage(req: Request, res: Response, next: NextFunction) {
    const _id = req.params._id;
    const message = await Messages.findByIdAndDelete(_id, { user_id: req.body.user_id }).exec();
    if (!message) return next(CustomError.notFound("Message wasn't found !"));
    return res.status(200).json({ Message: `Message has been deleted` });
  }
}

export default MessagesService;
