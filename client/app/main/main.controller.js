angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket) {
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
      'turn': 'x'};

    self.renderedGameState = [];

    self.renderGameState = function(){
      angular.forEach(self.gameState.grid, function(value){
        angular.forEach(value, function(value){
          self.renderedGameState.push(value);
        });
      });
    };
    self.message = '';

    self.renderGameState();

    self.joinGame = function(playerName) {
      self.state = 'joined';

      mySocket.emit('join', playerName);

      mySocket.on('stateUpdated', function (state) {
        self.gameState = state;
        console.log(state);
      });
    }

    self.makeMove = function() {
      // TODO Get coords
      var x = 0;
      var y = 0;
      mySocket.emit('move', {
        x: x,
        y: y
      });
    }
  });
