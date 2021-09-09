const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});

interface IProps {
  name: string;
  message: string;
}

io.on("connection", (socket: any): void => {
  socket.on("message", ({ name, message }: IProps) => {
    io.emit("message", { name, message });
  });
});

module.exports = io;
