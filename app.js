const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, JS) from the public folder
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // Forward the 'offer' to the other peer
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    // Forward the 'answer' to the other peer
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    // Forward ICE candidates to the other peer
    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    // Handle clearing message event
    socket.on('clearMessage', () => {
        console.log("Clearing message from server side");
        // Here you can perform any action you want, like logging or handling cleared messages.
        // However, since we do not store the messages, no action is needed here.
    });

    // Handle disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
