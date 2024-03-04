import { io } from "socket.io-client";

const URL = "ws://localhost:8080";

export const socket = io(URL);
