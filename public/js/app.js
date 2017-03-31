$(document).ready(function() {
    var socket = io();

    var pseudo = prompt('Quel est votre pseudo ?');
    socket.emit('nouveau_client', pseudo);
    document.title = pseudo + ' - ' + document.title;

    socket.on('message', function(data) {
        insereMessage(data.pseudo, data.message)
    })

    socket.on('nouveau_client', function(pseudo) {
        $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
    })

    socket.on("disconnect", function() {
        $('#zone_chat').prepend('<p><em>' + pseudo + ' a quitté le Chat !</em></p>');
    });

    $('#formulaire_chat').submit(function() {
        var message = $('#message').val();
        socket.emit('message', message);
        insereMessage(pseudo, message);
        $('#message').val('').focus();
        return false;
    });

    function insereMessage(pseudo, message) {
        $('#zone_chat').append($('<li>').html('<span class="username">' + pseudo + '</span> ' + message));
    }

});