import { Socket } from "socket.io";
import Chats from "../models/chatRoom.model";
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
      let currentHours: string | number = date.getHours().toString();
      let currentMinutes: string | number = date.getMinutes().toString();
      const time_stamp = `${currentHours.padStart(
        2,
        "0",
      )}:${currentMinutes.padStart(2, "0")}`;
      const members: string[] = [];
      findChat[0].members.forEach((element) => {
        members.push(element);
        io.to(element).emit("message", {
          members,
          messages: [{ sender, time_stamp, message }],
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

module.exports = io;
