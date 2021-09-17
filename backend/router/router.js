"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route = express.Router();
var createError = require("http-errors");
var userRoute = require("./users_route/users_route");
var inviteRoute = require("./invite_route/invite_route");
var Message = require("../models/messages.model");
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
