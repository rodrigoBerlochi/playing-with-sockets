'user strict';

const io = require('socket.io-client');
const uuidv4 = require('uuidv4');

function createClient () {
    const socketClient = io.connect('http://localhost:8081', {
        'transports': ['websocket'],
        'forceNew': true
    });

    const socketID = uuidv4();

    socketClient.on('connect', function () {
        socketClient.emit('register', socketID);
    });

    socketClient.on('broadcast', function(data) {
        if (data.success) {
            console.log(data.response);
            return;
        }

        console.log('Communication failed');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#create-client').on('click', createClient());
})

