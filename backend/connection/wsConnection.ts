import { Socket } from "socket.io";

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
  // emiting and getting messages
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
      invites,
      reciever,
      status,
    }: {
      invites: string;
      reciever: string;
      status: string;
    }) => {
      io.emit("friend_request", {
        invites,
        reciever,
        status,
      });
    },
  );
});

module.exports = io;
