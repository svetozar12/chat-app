import { Socket } from "socket.io";
const Invites = require("../models/Invites.model");
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

let me: string = "";
let you: string = "";

io.on("connection", (socket: Socket): void => {
  socket.on("sender_reciever", ({ sender, reciever }) => {
    me = sender;
    you = reciever;
  });
  socket.emit("send_message", { me, you });
  socket.on(
    "message",
    ({ name, message }: { name: string; message: string }) => {
      io.emit("message", {
        name,
        message,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      });
    },
  );

  socket.on(
    "friend_request",
    ({
      _id,
      inviter,
      reciever,
      status,
    }: {
      _id: string;
      inviter: string;
      reciever: string;
      status: string;
    }) => {
      console.log("friend request event");
      io.emit("friend_request", {
        _id,
        inviter,
        reciever,
        status,
      });
    },
  );

  socket.on(
    "send_friend_request",
    async ({ inviter, reciever }: { inviter: string; reciever: string }) => {
      const invite = await Invites.find({
        inviter,
        reciever,
        status: "recieved",
      });
      console.log(invite);
      console.log("send friend request event");
      socket.broadcast.emit("send_friend_request", {
        invite,
      });
    },
  );
});

module.exports = io;
