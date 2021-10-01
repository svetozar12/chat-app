import { Socket } from "socket.io";
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

let me: string = "";
let you: string = "";
let recieverId: string;
let senderId: string;

io.on("connection", (socket: Socket): void => {
  recieverId = socket.id;

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

  socket.on("room", ({ user }) => {
    socket.join(user);
  });

  socket.on("friend_request", () => {
    io.emit("friend_request");
  });

  socket.on("send_friend_request", ({ inviter, reciever }) => {
    if (inviter === reciever) return;
    io.to(reciever).emit("send_friend_request");
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

module.exports = io;
