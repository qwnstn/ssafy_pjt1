const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 8080,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
});

const clients = new Set();
const messages = [];
const messageLimit = 1; // maximum number of messages to store in memory

server.on('connection', (socket) => {
  console.log('Client connected');
  clients.add(socket);

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    messages.push(message);

    // remove oldest messages if the limit has been reached
    if (messages.length > messageLimit) {
      messages.shift();
    }

    clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    socket.send(`Received message: ${message}`);
  });
});