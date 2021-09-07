const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
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
    console.log(socket.id);
  });
});
const port: number = 4000;
http.listen(4000, function (): void {
  console.log(`listening on port ${port}`);
});
