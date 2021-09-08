const express = require("express");
const app = express();
import { Request, Response } from "express";
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

interface IProps {
  name: string;
  message: string;
}
//============================
// start of websocket connection
//============================
io.on("connection", (socket: any): void => {
  socket.on("message", ({ name, message }: IProps) => {
    io.emit("message", { name, message });
  });
});
//============================
// end of websocket connection
//============================
const User = require("./User.model");
const connectDb = require("./connection");
console.log(User);

connectDb().then(() => {
  console.log("Mongodb connected");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

app.get("/user-create", async (req: Request, res: Response) => {
  const user = new User({ username: "Example" });

  await user.save().then(() => console.log("user connected"));
  res.send("User connected \n");
});

const port: number = 4001;
app.listen(port, function (): void {
  console.log(`listening on port ${port}`);
});
// http://localhost:4001/
