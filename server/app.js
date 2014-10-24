/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Setup swarm
var url = require('url');
var ws = require('ws');
var Swarm = require('swarm');
require('./models/Position.js');

var fileStorage = new Swarm.FileStorage('storage');
var swarmHost = new Swarm.Host('swarm~nodejs', 0, fileStorage);
var wsServer = new ws.Server({ server: server });

wsServer.on('connection', function (ws) {
  var params = url.parse(ws.upgradeReq.url, true);
  console.log('incomingWS %s', params.path, ws.upgradeReq.connection.remoteAddress);
  swarmHost.accept(new Swarm.EinarosWSStream(ws), { delay: 50 });
});

// Expose app
exports = module.exports = app;