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

function createGrid() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

function createInitialState() {
  return {'grid': createGrid()};
}

function connectFirst(groupId, name) {
  currentState[groupId] = createInitialState();
  currentState[groupId].x = name;
}

function connectSecond(groupId, name) {
  currentState[groupId].o = name;
  currentState[groupId].turn  ='x';
}

function checkGrid(groupId) {
  var state = currentState[groupId];

  // Check rows
  for(var i = 0; i < state.length; i++) {
    if(state[i][0] === state[i][1] && state[i][1] === state[i][2]) {
      var grid = createGrid();
      grid[i][0] = state[i][0];
      grid[i][1] = state[i][1];
      grid[i][2] = state[i][2];
	  return grid;
    }
  }

  // Check colums
  for(var i = 0; i < state.length; i++) {
    if(state[0][i] === state[1][i] && state[1][i] === state[2][i]) {
      var grid = createGrid();
      grid[0][i] = state[0][i];
      grid[1][i] = state[0][i];
      grid[2][i] = state[0][i];
	  return grid;
    }
  }

  // Check diagonals
  if(state[0][0] === state[1][1] && state[1][1] === state[2][2]) {
    var grid = createGrid();
    grid[0][0] = state[0][0];
    grid[1][1] = state[1][1];
    grid[2][2] = state[2][2];
    return grid;
  }
  if(state[2][0] === state[1][1] && state[1][1] === state[0][2]) {
    var grid = createGrid();
    grid[2][0] = state[2][0];
    grid[1][1] = state[1][1];
    grid[0][2] = state[0][2];
    return grid;
  }

  return null;
}

function updateGrid(groupId, move) {
  var state = currentState[groupId];
  state[move.x][move.y] = state.turn;

  if(state.turn === 'x') {
	state.turn  ='o';
  } else if(state.turn === 'o') {
	state.turn  ='x';
  }

  var winner = checkGrid(groupId);
  if(winner) {
	state.winner = winner;
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