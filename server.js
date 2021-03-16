const express = require('express');
const socketio = require('socket.io');
// new things ^
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Statické soubory(to co uživatel vidí)
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('chat', msg => {
        io.emit('chat', msg);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server nasloucha na portu ${PORT}`);
});