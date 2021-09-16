import { Socket } from "socket.io";

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

const users: string[] = [];

interface IProps {
  id: number | string;
  name: string;
  message: string;
  timeStamp: string | number;
}

io.on("connection", (socket: Socket): void => {
  socket.on("sender_reciever", (data) => {
    console.log(data);
  });
  // emiting and getting messages
  socket.on("message", ({ name, message, id }: IProps) => {
    io.emit("message", {
      id,
      name,
      message,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    });
    console.log("id", id);
  });
});

module.exports = io;
