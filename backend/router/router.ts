const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const userRoute = require("./users_route/users_route");
const inviteRoute = require("./invite_route/invite_route");
const Message = require("../models/messages.model");

route.use("/", userRoute);
route.use("/", inviteRoute);

module.exports = route;

// route.get("/hi/:sender/:reciever", async (req: Request, res: Response) => {
//   try {
//     const message = await Message.find({
//       sender: req.params.sender,
//       reciever: req.params.reciever,
//     }).exec();
//     res.json({ message: message });
//   } catch (error) {
//     res.json({ error: error });
//   }
// });

// route.post("/:sender/:reciever", async (req: Request, res: Response) => {
//   try {
//     const message = new Message({
//       sender: req.params.sender,
//       reciever: req.params.reciever,
//       messages: req.body.message,
//     });
//     await message.save();
//     res.json({ message: message });
//   } catch (error) {
//     res.json({ error: "error" });
//   }
// });
