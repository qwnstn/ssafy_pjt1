import { WebSocketServer } from "ws";

// const WebSocket = require('ws');

export default function WebSocket() {
  const server = new WebSocketServer({ host: "0.0.0.0", port: 8080 });
  server.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
      console.log(`Received message: ${message}`);
      socket.send(`You sent: ${message}`);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
}