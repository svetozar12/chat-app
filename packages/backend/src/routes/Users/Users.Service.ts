import { NextFunction, Request, Response } from 'express';
import { externalUrlsEnv } from '../../config/env';
import User from '../../models/User.model';
import Chats from '../../models/chatRoom.model';

import { CustomError } from '../../utils/custom-error.model';
import { v4 as uuidv4 } from 'uuid';
import Invites from '../../models/Invites.model';
import { resMessages } from '../../common/constants';

class UsersService {
  async GetUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.user_id;
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    return res.status(200).send(user);
  }

  async CreateUser(req: Request, res: Response, next: NextFunction) {
    const userReqObj = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender,
    };
    const { username, password, email, gender } = userReqObj;

    const isRegistered = await User.findOne({ username }).exec();
    if (isRegistered) return next(CustomError.conflict(resMessages.user.ALREADY_EXIST));

    const user = new User({
      username,
      password,
      email,
      userAvatar: `${externalUrlsEnv.AVATAR_URL}/${uuidv4()}.svg`,
      gender,
    });

    const chat = await new Chats({
      members: user.username,
    });

    await user.save();
    await chat.save();
    return res.status(201).send({ Message: resMessages.user.CREATE(user.username) });
  }

  async UpdateUser(req: Request, res: Response, next: NextFunction) {
    const userReqObj = {
      userId: req.params.user_id,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      userAvatar: req.file?.filename,
    };

    const { userId, username, email, gender, userAvatar } = userReqObj;

    const users = await User.findOne({ _id: userId }).exec();
    if (!users) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    await User.findByIdAndUpdate(userId, {
      username: username ? username : users.username,
      email: email ? email : users.email,
      gender: gender ? gender : users.gender,
      userAvatar: email ? userAvatar : users.userAvatar,
    });
    return res.status(200).send({ Message: resMessages.user.UPDATE });
  }

  async DeleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.user_id;

    const user = await User.findOne({ _id: userId }).exec();
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    await User.deleteOne({ _id: userId }).exec();
    await Invites.deleteMany({
      reciever: userId,
    }).exec();
    await Invites.deleteMany({
      inviter: userId,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [userId] },
    }).exec();
    return res.status(200).json({ Message: resMessages.user.DELETE });
  }
}

export default UsersService;
