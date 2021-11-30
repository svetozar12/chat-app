import { Socket } from "socket.io";
import Chats from "../models/chatRoom.model";
import * as http from "http";

// const server = http.createServer();
const io = require("socket.io")(4001, {
  cors: {
    origin: "*",
  },
});

// sending message to specific chat room with two users(inviter,reciever)
io.on("connection", (socket: Socket): void => {
  socket.on("joined_chat_room", ({ user }) => {
    socket.join(user);
  });

  socket.on(
    "message",
    async ({
      chatInstance,
      sender,
      message,
    }: {
      chatInstance: string;
      sender: string;
      message: string;
    }) => {
      const findChat = await Chats.find({ _id: chatInstance })
        .select("members")
        .exec();
      const date = new Date();
      const messages = [{ sender, message, createdAt: date }];
      findChat[0].members.forEach((element: any) => {
        io.to(element).emit("message", {
          messages,
        });
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

// if (process.env.NODE_ENV !== "test") {
//   server.listen(process.env.PORT || 4000);
// }

module.exports = io;
