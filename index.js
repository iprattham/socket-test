const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// Dynamic port based on environment or fallback to 3000
const PORT = process.env.PORT || 3000;

// Set up Socket.IO with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "https://argus-alert.vercel.app",  // Your front-end URL
        methods: ["GET", "POST"],
    }
});

// Event listener for new WebSocket connections
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Handle incoming alerts from Python (or any source)
    socket.on('alert', (data) => {
        console.log('Received alert:', data);

        // Broadcast the alert to all connected clients (your front-end)
        io.emit('new-alert', data);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Serve HTTP on the chosen port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
