const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    setInterval(() => {
        const randomNum = Math.floor(Math.random() * 100);
        socket.emit('number', randomNum);
    }, 1000);
});

// Start server
http.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});