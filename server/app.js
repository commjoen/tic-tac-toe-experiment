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

var playerCounter = 0;

function getGroupId() {
	return 'group' + Math.floor(playerCounter++ / 2);
}

var currentState = {};

function createInitialState() {
  return {
    'grid': [
       [null, null, null],
       [null, null, null],
       [null, null, null]
     ]};
}

function connectFirst(groupId, name) {
  currentState[groupId] = createInitialState();
  currentState[groupId].x = name;
}

function connectSecond(groupId, name) {
  currentState[groupId].o = name;
  currentState[groupId].turn  ='x';
}

function checkGrid() {
  // TODO Check cheating
  // TODO Check winner
}

function updateGrid(groupId, move) {
  currentState[groupId] = state;
  if(currentState[groupId].turn === 'x') {
    currentState[groupId].turn  ='o';
  } else if(currentState[groupId].turn === 'o') {
    currentState[groupId].turn  ='x';
  }
}

function connected(groupId, name) {
  if(!currentState[groupId]) {
    connectFirst(groupId, name);
  } else if(!currentState[groupId].turn) {
	connectSecond(groupId, name);
  }
}

// socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  var groupId = getGroupId();

  socket.on('join', function(name) {
	socket.join(groupId);
	connected(groupId, name);
	io.to(groupId).emit('stateUpdated', currentState[groupId]);
  });

  socket.on('move', function(move) {
	updateGrid(groupId, move);
	io.to(groupId).emit('stateUpdated', currentState[groupId]);
  });
});

// Expose app
exports = module.exports = app;