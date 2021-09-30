const express = require("express");
const route = express.Router();
<<<<<<< HEAD
const createError = require("http-errors");
=======
const { registerValidation } = require("../../helpers/schema");
>>>>>>> invites-ws-fix

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({
      username: req.params.username,
    }).exec();
    if (!users || undefined)
      return res.status(400).json({
        ERROR: "Invalid input",
        message: `User ${req.params.username} doesn't exist`,
      });
    return res.json({ message: users });
  } catch (error: any) {
<<<<<<< HEAD
    return res
      .status(error.status)
      .json({ errorStatus: error.status, message: error, stack: error.stack });
=======
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
>>>>>>> invites-ws-fix
  }
});

route.post("/users/register", async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
=======
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

>>>>>>> invites-ws-fix
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        return res.status(400).json({
          ERROR: "Invalid input",
          message: `User ${req.body.username} already exist`,
        });
      }
    }

    const user = new User({ type: "POST", username: req.body.username });
<<<<<<< HEAD
    if (req.body.username === "")
      return res
        .status(400)
        .json({ Error: "Invalid input", message: "Please enter valid input" });
=======
>>>>>>> invites-ws-fix

    await user.save();
    return res
      .status(201)
      .send({ message: `User ${req.body.username} created` });
  } catch (error: any) {
<<<<<<< HEAD
    return res
      .status(error.status)
      .json({ errorStatus: error.status, message: error });
=======
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
>>>>>>> invites-ws-fix
  }
});

route.delete("/users/:username", async (req: Request, res: Response) => {
<<<<<<< HEAD
  console.log("hi");

=======
>>>>>>> invites-ws-fix
  try {
    const data = await User.deleteOne({ username: req.params.username }).exec();
    return res.status(204);
  } catch (error) {
<<<<<<< HEAD
    return res.json({ error }).sendStatus(501);
=======
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
>>>>>>> invites-ws-fix
  }
});

module.exports = route;
