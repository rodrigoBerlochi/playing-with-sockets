'use strict';

require('dotenv').config();

const express = require('express');
const io = require('socket.io');
const http = require('http');
const ownRoutes = require('./routes/routes');
//const path = require('path');

/**
 * create the express http server
 */
const App = express();

    App.use(ownRoutes);

const Server = http.createServer(App).listen(process.env.DEV_PORT, () => {
    console.log('Socket server running on port ' + process.env.DEV_PORT);
});

/**
 * integrate sockets to the server
 */
// list of concurrent client instance connected to this server
global.socketsMap = {};

const SocketServer = io(Server);

SocketServer.on('connection', (socket) => {
    
    socket.on('register', (id) => {
        socketsMap[id] = socket;
        console.log('Socket with ID ' + id + ' connected to server');
    });       
    
    socket.on('disconnect', () => {
        for (let id in socketsMap) {
            if (socketsMap[id] === socket) {
                delete socketsMap[id];
                console.log('Socket with ID ' + id + ' disconnected');
            }
        }
    });

});

