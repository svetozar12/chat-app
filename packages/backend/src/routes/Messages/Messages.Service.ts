import { NextFunction, Request, Response } from 'express';
import { resMessages } from '../../common/constants';
import Messages from '../../models/Message.model';
import User from '../../models/User.model';
import { CustomError } from '../../utils/custom-error.model';

class MessagesService {
  async GetMessage(req: Request, res: Response, next: NextFunction) {
    const messageReqObj = {
      chatId: req.params.chat_id,
      pageSize: Number(req.query.page_size) || 2,
      pageNumber: Number(req.query.page_number) || 1,
    };
    const { chatId, pageNumber, pageSize } = messageReqObj;
    const messages = await Messages.find({ chat_id: chatId })
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort({ createdAt: 'desc' })
      .exec();

    if (messages.length <= 0 || !messages) return next(CustomError.notFound(resMessages.messages.NOT_FOUND));
    return res.status(200).json(messages.reverse());
  }

  async CreateMessage(req: Request, res: Response, next: NextFunction) {
    const messageReqObj = {
      chatId: req.params.chat_id,
      userId: req.body.user_id,
      reqMessage: req.body.message,
    };
    console.log(messageReqObj);

    const { chatId, reqMessage, userId } = messageReqObj;

    const sender = await User.findById(userId);
    if (!sender) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const message = await new Messages({
      user_id: userId,
      chat_id: chatId,
      sender: sender.username,
      message: reqMessage,
      seenBy: [],
    });
    if (!message) return next(CustomError.badRequest());

    await message.save();
    return res.status(201).json(message);
  }

  async UpdateMessage(req: Request, res: Response, next: NextFunction) {
    const messageReqObj = {
      messageId: req.params._id,
      reqMessage: req.body.message,
    };
    const { messageId, reqMessage } = messageReqObj;

    if (reqMessage === '' || reqMessage === null) return res.status(200).json({ Message: resMessages.common.NO_CHANGES });
    const message = await Messages.findOneAndUpdate({ _id: messageId, user_id: req.body.user_id }, { message: reqMessage }).exec();
    if (!message) return next(CustomError.notFound(resMessages.messages.NOT_FOUND));
    return res.status(200).json({ Message: resMessages.messages.UPDATE });
  }

  async DeleteMessage(req: Request, res: Response, next: NextFunction) {
    const _id = req.params._id;
    const message = await Messages.findByIdAndDelete(_id, { user_id: req.query.user_id }).exec();
    if (!message) return next(CustomError.notFound(resMessages.messages.NOT_FOUND));
    return res.status(200).json({ Message: resMessages.messages.DELETE });
  }
}

export default MessagesService;
