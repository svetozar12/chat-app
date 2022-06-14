import { Types } from "mongoose";
import { Socket } from "socket.io";
import { constants } from "../constants";
import Chats from "../models/chatRoom.model";
import User from "../models/User.model";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createServer } = require("http");
const server = createServer();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require("socket.io")(server, {
  cors: {
    origin: constants.CLIENT_URL,
  },
});
// sending message to specific chat room with two users(inviter,reciever)
io.on("connection", (socket: Socket): void => {
  console.log("ws connecting...");

  socket.on("joined_chat_room", ({ chatInstance }) => {
    socket.join(chatInstance);
  });

  socket.on("message", async ({ chatInstance, sender, message }: { chatInstance: string; sender: string; message: string }) => {
    const findChat = await Chats.findOne({ _id: chatInstance }).select("members").exec();
    if (!findChat) return null;
    const date = new Date();
    const messages = [{ sender, message, createdAt: date }];
    findChat.members.forEach(async () => {
      console.log(message);
      io.to(chatInstance).emit("message", {
        messages,
      });
    });
  });

  socket.on("join_chat", ({ chat_id }) => {
    socket.join(chat_id);
  });

  socket.on("room", ({ user }) => {
    console.log(user, "room");

    socket.join(user);
  });

  socket.on("friend_request", () => {
    console.log("friendo");

    io.emit("friend_request");
  });

  socket.on("inviting_multiple_users", ({ users }) => {
    io.emit("inviting_multiple_users", { users });
  });
  socket.on("send_friend_request", async ({ inviter, reciever }) => {
    console.log(inviter, reciever, "averi");
    const reciever_field = await User.findOne({ username: reciever });
    if (!reciever_field) return;
    if (inviter === reciever) return;
    console.log(reciever_field._id);
    const _id = reciever_field._id.toString().split("(");
    console.log(_id[0], "adi");

    io.to(_id[0]).emit("send_friend_request");
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(constants.WS_PORT || 4000);
}

export default io;
