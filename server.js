var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket, pseudo) {

    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.emit('nouveau_client', socket.pseudo);
    });


    socket.on('message', function(message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', { pseudo: socket.pseudo, message: message });
    });
});

server.listen(1337, function() {
    console.log('listening on *:1337');
});