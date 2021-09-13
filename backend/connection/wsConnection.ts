import { Socket } from "socket.io";

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

interface IProps {
  name: string;
  message: string;
}

io.on("connection", (socket: Socket): void => {
  socket.on("message", (message: IProps) => {
    io.emit("message", message);
    console.log(message);
  });
});

module.exports = io;
