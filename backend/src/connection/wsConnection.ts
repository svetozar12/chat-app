import { createServer } from "http";
import { Server, Socket } from "socket.io";
// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket): void => {
  socket.on("joined_chat_room", ({ user }) => {
    socket.join(user);
  });

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
      const date = new Date();
      let currentHours: string | number = date.getHours().toString();
      let currentMinutes: string | number = date.getMinutes().toString();
      const time_stamp = `${currentHours.padStart(
        2,
        "0",
      )}:${currentMinutes.padStart(2, "0")}`;
      io.to(reciever)
        .to(sender)
        .emit("message", {
          members: [sender, reciever],
          messages: [{ send: sender, time_stamp, message }],
        });
    },
  );

  socket.on("join_chat", ({ chat_id }) => {
    socket.join(chat_id);
  });

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

// export default io;
module.exports = io;
