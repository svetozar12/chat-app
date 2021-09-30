const express = require("express");
const route = express.Router();

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites/:id/", async (req: Request, res: Response) => {
<<<<<<< HEAD
  //Doesnt work without query
=======
>>>>>>> invites-ws-fix
  try {
    const name = req.params.id;
    let status = req.query.status;

    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: name,
<<<<<<< HEAD
=======

>>>>>>> invites-ws-fix
            status,
          })
        : await Invites.find({
            reciever: name,
<<<<<<< HEAD
          }).select("status  inviter");

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have invites or this this account doesn't exist.",
      });
    }
    res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({ error: "error" });
=======
          }).select("status  inviter reciever");

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have invites .",
      });
    }

    return res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

route.get("/invites/inviter/:id/", async (req: Request, res: Response) => {
  try {
    const name = req.params.id;
    let status = req.query.status;

    const invites =
      status !== undefined
        ? await Invites.find({
            inviter: name,
            status,
          })
        : await Invites.find({
            inviter: name,
          }).select("status  inviter reciever");

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have accepted invites .",
      });
    }

    return res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
>>>>>>> invites-ws-fix
  }
});

route.put("/invites", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const status = req.body.status;

    const inviteInstance = await Invites.findOne({
      id,
    }).exec();

    if (!inviteInstance || undefined || !status) {
      return res.status(404).json({ error: "Not found" });
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
  } catch (error) {
<<<<<<< HEAD
    res.status(501).send({ error: "error" });
  }
});
// end of accept and ignore put requsts
=======
    res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});
>>>>>>> invites-ws-fix

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      username: req.body.reciever,
<<<<<<< HEAD
    });
=======
    }).exec();

    if (user === null) {
      return res.status(404).json({ ERROR: "User Not found" });
    }
>>>>>>> invites-ws-fix

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
<<<<<<< HEAD
      status: "recieved",
    });
    const findInvites = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: "recieved",
    });
    //check if findInvites and checkInviteInstance are equal
    if (findInvites && checkInviteInstance) {
      return res.status(409).json({ ERROR: "Already sent" });
    }
    if (!user) {
      return res.status(404).json({ ERROR: "User Not found" });
    }
    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
=======
      $or: [{ status: "recieved" }, { status: "accepted" }],
    }).exec();

    // const findInvites = await Invites.findOne({
    //   id: user._id,
    //   reciever: req.body.reciever,
    //   inviter: req.body.inviter,
    //   $or: [{ status: "recieved" }, { status: "accepted" }],
    // }).exec();
    //check if findInvites and checkInviteInstance are equal
    if (checkInviteInstance) {
      return res.status(409).json({ ERROR: "Already sent" });
    }

    if (req.body.reciever === req.body.inviter)
      return res.status(409).json({ ERROR: "Can't send invites to youurself" });
    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: req.body.status,
>>>>>>> invites-ws-fix
    });
    await invites.save();
    return res.status(201).json({ message: invites });
  } catch (error) {
<<<<<<< HEAD
    return res.status(501).send("error");
=======
    res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
>>>>>>> invites-ws-fix
  }
});

module.exports = route;
