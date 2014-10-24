angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket, $famous){
    var self = this;

    self.state = 'init';

    self.colorX = 'green';
    self.colorO = 'red';

    self.gameState = {
      grid: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ],
      'x': 'nameplayer1',
      'o': 'nameplayer2',
      'turn': 'x'};

    self.renderedGameState = [];

    self.registerMove = function (index){
      var xAxis = Math.floor(index / 3);
      var yAxis = index - 3 * xAxis;
      self.gameState.grid[xAxis][yAxis] = self.gameState.turn;
      self.verifyWinningMove(xAxis, yAxis, self.gameState.turn);
      self.renderGameState();
    }

    self.verifyWinningMove = function (xAxis, yAxis, char){

    }

    self.renderGameState = function (){
      self.renderedGameState = [];
      angular.forEach(self.gameState.grid, function (value){
        angular.forEach(value, function (value){
          self.renderedGameState.push(value);
        });
      });
    };
    self.message = '';

    self.renderGameState();

    self.joinGame = function (playerName){
      self.state = 'joined';

      mySocket.emit('join', playerName);

      mySocket.on('stateUpdated', function (state){
        self.gameState = state;
        self.renderGameState();
        console.log(state);
        if (self.gameState.turn === 'x') {
          self.colorX = 'green';
          self.colorO = 'red';
        } else {
          self.colorX = 'red';
          self.colorO = 'green';
        }
      });
    }

    self.makeMove = function(index) {
      // TODO Get coords
      var x = Math.floor(index / 3);
      var y = index - 3*x;
      mySocket.emit('move', {
        x: x,
        y: y
      });
    }
  });
