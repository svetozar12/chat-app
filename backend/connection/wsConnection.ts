import { Socket } from "socket.io";

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

interface IProps {
  id: number | string;
  name: string;
  message: string;
  timeStamp: string | number;
}

io.on("connection", (socket: Socket): void => {
  // console.log(socket.id);
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
  // creating socket rooms and displaying users
  socket.on("joinRoom", (room) => {
    socket.join(room);
    // console.log(socket.rooms);
    socket.on("userList", ({ name }) => {
      io.emit("userList", {
        name,
      });
      console.log(name);
    });
  });
});

module.exports = io;
