const express = require("express");
const route = express.Router();

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
// ! ================= !
// ! PROBLEMATIC ROUTE !
// ! ================= !
route.put("/:inviter/:reciever", async (req: Request, res: Response) => {
  try {
    const inviteInstance = await Invites.findOne({
      inviter: req.params.inviter,
      reciever: req.params.reciever,
      status: "recieved",
    }).exec();

    if (!inviteInstance || undefined) {
      return res.status(404).json({ error: "Not found" });
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      inviteInstance._id,
      {
        status: "accepted",
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
  } catch (error) {
    return res.status(501).json({ error: "error" });
  }
});
// end of accept and ignore put requsts

// ! ================= !
// ! PROBLEMATIC ROUTE !
// ! ================= !
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
      }).exec();

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

      if (findInvites || checkInviteInstance) {
        return res.status(409).json({ error: "Already sent" });
      }

      if (!user1 || !user2) {
        return res.status(404).json({ message: "User Not found" });
      }
      const invites = await new Invites({
        type: "POST",
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "recieved",
      });

      await invites.save();
      return res.status(201).json({ message: invites });
    } catch (error) {
      return res.status(501).send("error");
    }
  },
);

module.exports = route;
