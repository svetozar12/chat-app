const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/recieved", async (req: Request, res: Response) => {
  try {
    const invites = await Invites.find({ status: "recieved" }).exec();
    if (!invites || undefined || invites === {}) {
      res.status(404).json({ error: "Not found" });
      throw Error;
    }
    res.json({ invites }).status(201);
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});

route.get("/accepted", async (req: Request, res: Response) => {
  try {
    const invites = await Invites.find({ status: "accepted" }).exec();
    if (!invites || undefined || invites === {}) {
      res.status(404).json({ error: "Not found" });
      throw Error;
    }
    res.json({ invites }).status(201);
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});

// accept and ignore put requests
route.put("/:inviter/:reciever", async (req: Request, res: Response) => {
  try {
    const inviteInstance = await Invites.findOne({
      inviter: req.params.inviter,
      reciever: req.params.reciever,
      status: "recieved",
    });

    if (!inviteInstance || undefined) {
      res.status(404).json({ error: "Not found" });
      throw Error;
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      inviteInstance._id,
      {
        status: "accepted",
      },
      { new: true },
    );

    res.json({ message: updateStatus });
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});
// end of accept and ignore put requsts

route.post(
  "/invites/:inviter/:reciever",
  async (req: Request, res: Response) => {
    try {
      const user1 = await Users.findOne({
        username: req.params.inviter,
      }).exec();
      const user2 = await Users.findOne({
        username: req.params.reciever,
      }).exec();

      const checkInviteInstance = await Invites.findOne({
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "accepted",
      });

      // const checkInviteInstance = await Invites.findOne({ Not sure
      //   inviter: req.params.inviter,
      //   reciever: req.params.reciever,
      //   status: "declined",
      // });

      const findInvites = await Invites.findOne({
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "recieved",
      });
      console.log("mario", findInvites);
      if (findInvites || checkInviteInstance) {
        res.status(409).json({ error: "Already sent" });
        throw Error;
      }

      if (!user1 || !user2 || undefined) {
        res.status(404).json({ message: "User Not found" });
        throw Error;
      }
      const invites = await new Invites({
        type: "POST",
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "recieved",
      });
      await invites.save();
      res.status(201).json({ message: invites });
      res.send("hi");
    } catch (error) {
      res.status(501).send("error");
    }
  },
);

module.exports = route;
