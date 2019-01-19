'use strict';

const express = require('express');
const router = express.Router(); // create a Router instance
const version = require('../../package.json').version;
var decycle = require('json-decycle').decycle

router.get('/health', function (req, res) {

    res.send({
        port: process.env.DEV_PORT,
        message: '4',
        pid: process.pid,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        version
    });

});

router.get('/', (req, res) => {
    res.send({clients: JSON.stringify(Object.keys(global.socketsMap), decycle())});
});

// export the router instance so the App can use it
module.exports= router;

