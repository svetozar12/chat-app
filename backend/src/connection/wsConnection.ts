import { Socket } from "socket.io";
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

let me: string = "";
let you: string = "";
let recieverId: number | string;
let senderId: string | string[];

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
  socket.on("invite_room", (reciever_id) => {
    recieverId = reciever_id;
    socket.join(reciever_id);
  });
  socket.on("friend_request", () => {
    io.emit("friend_request");
  });

  socket.on("send_friend_request", ({ inviter, reciever }) => {
    if (inviter === reciever) return;
    console.log(socket.rooms, "ROOMS");
    console.log(recieverId, "RECIEVER");

    socket.in(recieverId).emit("send_friend_request");
  });
});

module.exports = io;
