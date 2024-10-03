const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    
    // Send an alert when needed
    socket.emit("alert", {
        message: `ALERT: Threat Detected ${Math.floor(Math.random() * 100)}!`,
        image: "<base64_encoded_image>"
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(3000, () => console.log("Listening on port 3000"));
