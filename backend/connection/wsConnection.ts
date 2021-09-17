import { Socket } from "socket.io";

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

let me: string = "";
let you: string = "";
let messages: string[] = [];

if (messages.length >= 11) messages.shift();

interface IProps {
  id: number | string;
  name: string;
  message: string;
  timeStamp: string | number;
}

io.on("connection", (socket: Socket): void => {
  socket.on("sender_reciever", ({ sender, reciever }) => {
    me = sender;
    you = reciever;
  });
  socket.emit("send_message", { me, you });
  // emiting and getting messages
  socket.on("message", ({ name, message }: IProps) => {
    io.emit("message", {
      name,
      message,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    });
  });
});

module.exports = io;
