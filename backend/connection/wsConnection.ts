import { Socket } from "socket.io";

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

interface IProps {
  name: string;
  message: string;
  timeStamp: string | number;
}

io.on("connection", (socket: Socket): void => {
  // emiting and getting messages
  socket.on("message", ({ name, message }: IProps) => {
    console.log(message);
    io.emit("message", {
      name,
      message,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    });
  });
  // creating socket rooms
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("joined in room");
  });
});

module.exports = io;
