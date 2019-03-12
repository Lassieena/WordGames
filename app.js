'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;
let a = 'り';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

io.on('connection',(socket) => {
    socket.on('setUserName', (userName) => {
        if(!userName) userName = '匿名';
        socket.userName = userName;
    });

    socket.on('message', (msg) => {
        if(socket.msg == '') return;
        let b = msg.slice(0,1);
        if(b !== a) return; 
        console.log('[user: ' + socket.userName + '] message: ' + msg);
        io.emit('message', socket.userName + ': ' + msg);
        a = msg.slice(-1);
    });
});


http.listen(PORT, () => {
    console.log('server listening. Port:' + PORT);
});