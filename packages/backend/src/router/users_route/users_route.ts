import * as express from "express";
import {
  registerValidation,
  update_formValidation,
} from "../../helpers/schema";
import { Request, Response } from "express";
const route = express.Router();
import User from "../../models/User.model";
import Invites from "../../models/Invites.model";
import Chats from "../../models/chatRoom.model";
import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

route.post("/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerValidation(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    if (error) {
      return res.status(409).json({ message: error.message });
    }

    const users = await User.findOne({ username }).exec();
    if (users) return res.status(409).json({ message: "user already exist" });

    const user = new User({
      type: "POST",
      username,
      password,
      email,
      userAvatar: "",
      gender,
    });

    const chat = await new Chats({
      members: username,
    });

    await user.save();
    await chat.save();
    return res
      .status(201)
      .send({ message: `User ${req.body.username} created` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

route.put(
  "/update",
  upload.single("userAvatar"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.file);
      console.log(req.body);

      const { error } = update_formValidation(req.body);
      const username = req.body.username;
      const email = req.body.email;
      const gender = req.body.gender;
      const userAvatar = req.file?.path;
      const users = await User.findOne({ username }).exec();
      console.log(users);

      const user_id = users?._id;

      // if (error) {
      //   return res.status(409).json({ message: error.message });
      // }

      // if (!users) return res.status(404).json({ message: "User not found" });
      const new_user = await User.findByIdAndUpdate(user_id, {
        email,
        gender,
        userAvatar,
      });
      return res.status(200).send({ message: `User ${username} info updated` });
    } catch (error) {
      return res.status(501).json({
        ErrorMsg: (error as Error).message,
        Error: "Internal server error",
        Message: "Something went wrong while registering",
      });
    }
  },
);

route.delete("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    await User.deleteOne({ username }).exec();
    await Invites.deleteMany({
      reciever: username,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [username] },
    }).exec();
    return res.status(200).json({ message: `user ${username} deleted` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { route };
