const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Statické soubory(to co uživatel vidí)
app.use(express.static(path.join(__dirname, 'public')));

const username = {}

io.on('connection', (socket) => {

    socket.on('login', name => {
        username[socket.id] = name;
        if (username != null)
        socket.emit('logged', name);
        socket.broadcast.emit("conected", name);
    })

    socket.on('chat', msg => {
        socket.broadcast.emit('chat', msg);
        //io.emit('chat', msg);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', username[socket.id]);
        delete username[socket.id];
    });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server nasloucha na portu ${PORT}`);
});