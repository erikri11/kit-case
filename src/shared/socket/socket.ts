import { io, Socket } from "socket.io-client";

const URL = "http://localhost:4000";

export const socket: Socket = io(URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
