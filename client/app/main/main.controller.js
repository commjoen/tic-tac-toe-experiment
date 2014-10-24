angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket, $famous) {
    var self = this;

    self.state = 'init';




    self.gameState = {
      grid: [
        [' x', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ],
      'x': 'nameplayer1',
      'o': 'nameplayer2',
      'turn': 'x'};

    self.renderedGameState = [];

    self.renderGameState = function(){
      self.renderedGameState=[];
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
        self.renderGameState();
        console.log(state);
      });
    }

    self.makeMove = function(index) {
      // TODO Get coords
      var x = Math.floor(index / 3);
      var y = index - 3*y;
      mySocket.emit('move', {
        x: x,
        y: y
      });
    }
  });
