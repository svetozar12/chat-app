const express = require("express");
const route = express.Router();

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites/:id/", async (req: Request, res: Response) => {
  //Doesnt work without query
  try {
    const name = req.params.id;
    let status = req.query.status;
    console.log(status);

    if (status === undefined) {
      status = "z";
    }

    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: name,
            status,
          })
        : await Invites.find({
            reciever: name,
          }).select("status");

    if (!invites || invites === {}) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({ error: "error" });
  }
});

route.put("/invites", async (req: Request, res: Response) => {
  try {
    const reciever = req.body.reciever;
    const id = req.body.id;
    const status = req.body.status;

    const inviteInstance = await Invites.findOne({
      reciever,
      id,
    }).exec();

    if (!inviteInstance || undefined) {
      return res.status(404).json({ error: "Not found" });
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      inviteInstance._id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
  } catch (error) {
    res.status(501).send({ error: "error" });
  }
});
// end of accept and ignore put requsts

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      username: req.body.reciever,
    });

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      status: "recieved",
    });
    const findInvites = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      status: "recieved",
    });
    //check if findInvites and checkInviteInstance are equal
    if (findInvites || checkInviteInstance) {
      res.status(409).json({ error: "Already sent" });
    }
    if (!user) {
      res.status(404).json({ message: "User Not found" });
    }
    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
    });
    await invites.save();
    return res.status(201).json({ message: invites });
  } catch (error) {
    res.status(501).send("error");
  }
});

module.exports = route;
