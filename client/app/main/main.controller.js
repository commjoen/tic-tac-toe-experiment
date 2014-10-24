angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope) {
    var self = this;

    self.state = 'init';

    self.gameState = {
      'grid': [
        ['x ', 'x ', ' '],
        ['o ', 'o ', ' '],
        ['x', ' ', 'x ']
      ],
      'x': 'nameplayer1',
      'o': 'nameplayer2',
      'turn': 'x'
    };

    self.renderedGameState = [];

    self.renderGameState = function () {
      angular.forEach(self.gameState.grid, function (value) {
        angular.forEach(value, function (value) {
          self.renderedGameState.push(value);
        });
      });
    };

    self.renderGameState();

    self.joinGame = function(playerName) {
      self.state = 'joined';

//      mySocket.emit('join', playerName);
//
//      mySocket.on('stateUpdated', function (state) {
//        self.gameState = state;
//        console.log(state);
//      });
    };

    self.makeMove = function() {
      // TODO Get coords
      var x = 0;
      var y = 0;
//      mySocket.emit('move', {
//        x: x,
//        y: y
//      });
    };



    var swarmHost = new Swarm.Host(String(Math.random()).slice(2));
    swarmHost.connect('ws://localhost:9000/');

    // TODO import from server
    var Position = Swarm.Model.extend('Position', {
      defaults: {
        x: 0,
        y: 0
      }
    });

    var pos = new Position('cursor');
    pos.on(function (spec, val) {
      self.cursor = val;
      $scope.$digest();
    });

    $(document).mousemove(function (event) {
      pos.set({
        x: event.clientX,
        y: event.clientY
      })
    });

  });
