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

  socket.on("message", async ({ chatInstance, sender, message }: { chatInstance: string; sender: string; message: string }) => {
    const findChat = await Chats.findOne({ _id: chatInstance }).select("members").exec();
    if (!findChat) return null;
    const date = new Date();
    const messages = [{ sender, message, createdAt: date }];
    console.log(messages, "message", socket.rooms);

    io.to(chatInstance).emit("message", {
      messages,
    });
  });

  socket.on("join_chat", ({ rooms }) => {
    socket.join(rooms);
    console.log(rooms);
  });

  socket.on("friend_request", () => {
    io.emit("friend_request");
  });

  socket.on("inviting_multiple_users", ({ users }) => {
    io.emit("inviting_multiple_users", { users });
  });
  socket.on("send_friend_request", async ({ inviter, reciever }) => {
    const reciever_field = await User.findOne({ username: reciever });
    console.log(reciever_field);

    if (!reciever_field) return;
    if (inviter === reciever) return;
    const _id = reciever_field.username;
    console.log(_id, socket.rooms);
    io.to(_id).emit("send_friend_request");
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(constants.WS_PORT || 4000);
}

export default io;
