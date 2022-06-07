import { NextFunction, Request, Response } from "express";
// import { registerValidation, update_formValidation } from "../../validators/schema";
// models
import User from "../../models/User.model";
import Invites from "../../models/Invites.model";
import Chats from "../../models/chatRoom.model";
import { CustomError } from "../../utils/custom-error.model";

interface IUsersController {
  GetUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  DeleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

const UsersController: IUsersController = {
  GetUser: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.user_id;
    const users = await User.findOne({ _id }).exec();
    if (!users) return next(CustomError.notFound(`User: ${_id} wasn't found`));
    return res.status(200).send({ user: users });
  },

  CreateUser: async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;

    const users = await User.findOne({ username }).exec();
    if (users) return next(CustomError.conflict(`User already exists !`));

    const user = new User({
      type: "POST",
      username,
      password,
      email,
      userAvatar: "",
      gender,
    });

    const chat = await new Chats({
      members: user._id,
    });

    await user.save();
    await chat.save();
    return res.status(201).send({ message: `User ${req.body.username} created` });
  },

  UpdateUser: async (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(200).send({ message: `User ${username} info updated` });
  },

  DeleteUser: async (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(200).json({ message: `User ${user_id} deleted` });
  },
};

export default UsersController;
