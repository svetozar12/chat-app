import { NextFunction, Request, Response } from 'express';
import { externalUrlsEnv } from '../../config/env';
import User from '../../models/User.model';
import Chats from '../../models/chatRoom.model';

import { CustomError } from '../../utils/custom-error.model';
import { v4 as uuidv4 } from 'uuid';
import Invites from '../../models/Invites.model';

class UsersService {
  async GetUser(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.user_id;
    const users = await User.findOne({ _id }).exec();
    if (!users) return next(CustomError.notFound(`User: ${_id} wasn't found`));
    return res.status(200).send({ user: users });
  }

  async CreateUser(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;

    const users = await User.findOne({ username }).exec();
    if (users) return next(CustomError.conflict(`User already exists !`));

    const avatarGenerator = () => {
      return `${externalUrlsEnv.AVATAR_URL}/${uuidv4()}.svg`;
    };

    const user = new User({
      type: 'POST',
      username,
      password,
      email,
      userAvatar: avatarGenerator(),
      gender,
    });

    const chat = await new Chats({
      members: user.username,
    });

    await user.save();
    await chat.save();
    return res.status(201).send({ Message: `User ${req.body.username} created` });
  }

  async UpdateUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.user_id;
    const username = req.body.username;

    let email = req.body.email;
    const gender = req.body.gender;
    const userAvatar = req.file?.filename;
    const users = await User.findOne({ _id: id }).exec();
    const user_id = users?._id;
    if (!email) email = users?.email;
    if (!users) return next(CustomError.notFound("User wasn't found !" + id));

    await User.findByIdAndUpdate(user_id, {
      username: username ? username : users.username,
      email: email ? email : users.email,
      gender: gender ? gender : users.gender,
      userAvatar: email ? userAvatar : users.userAvatar,
    });
    return res.status(200).send({ Message: `User ${username || users.username} info updated` });
  }

  async DeleteUser(req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;
    const user = await User.findOne({ _id: user_id }).exec();

    if (!user) return next(CustomError.notFound(`User: ${user_id} wasn't found`));

    await User.deleteOne({ _id: user_id }).exec();
    await Invites.deleteMany({
      reciever: user_id,
    }).exec();
    await Invites.deleteMany({
      inviter: user_id,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [user_id] },
    }).exec();
    return res.status(200).json({ Message: `User ${user_id} deleted` });
  }
}

export default UsersService;
