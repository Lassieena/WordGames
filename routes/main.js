'use strict';
    const socket = io();
    $(() => {
        socket.on('connect', () => {
            let names = prompt('ユーザー名を入力してください');
            socket.emit('setUserName', names);
            $('#name').text('ユーザー名: ' + names);
        });

        $('#myform').submit(() => {
            // if($('#input_msg') = "") return;
            socket.emit('message', $('#input_msg').val());
            $('#input_msg').val('');
            return false;
        });
        socket.on('message', (msg) => {
            $('#message').append($('<li>').text(msg));
        });
    });