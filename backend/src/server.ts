import http from "http";
import { Server } from "socket.io";
import app from "./app";

const PORT = process.env.PORT || 4000;
const URL = process.env.CLIENT_URL || "http://localhost:5173";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.onAny((event, ...args) => {
    console.log("Event:", event, args);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
