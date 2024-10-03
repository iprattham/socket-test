const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for all origins (to allow your Vercel frontend to connect)
const io = new Server(server, {
  cors: {
    origin: "*", // This allows any origin to connect, adjust if needed
    methods: ["GET", "POST"]
  }
});

// Log when a client connects
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Handle the 'alert' event from the client (your Python script)
  socket.on('alert', (data) => {
    console.log('Alert received:', data);
    
    // Broadcast the alert to all connected clients (including the frontend)
    io.emit('alert', data);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Server listens on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
