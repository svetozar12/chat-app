import { Socket } from "socket.io";
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

let global_reciever: string;

io.on("connection", (socket: Socket): void => {
  socket.on(
    "message",
    ({
      sender,
      reciever,
      message,
    }: {
      sender: string;
      reciever: string;
      message: string;
    }) => {
      io.emit("message", {
        sender,
        reciever,
        message,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      });
    },
  );

  socket.on("room", ({ user }) => {
    socket.join(user);
  });

  socket.on("join_chat", ({ chat_id }) => {
    socket.join(chat_id);
    global_reciever = chat_id;
    console.log(socket.rooms); //dont forget to disconnect them from the rooms later
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
