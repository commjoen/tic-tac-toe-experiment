angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket) {
    var self = this;

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

    self.registerMove = function(index) {
      var xAxis = Math.floor(index / 3);
      var yAxis = index - 3*xAxis;
      self.gameState.grid[xAxis][yAxis] = self.gameState.turn;
      self.verifyWinningMove(xAxis, yAxis, self.gameState.turn);
      self.renderGameState();
    }

    self.verifyWinningMove = function(xAxis, yAxis, char) {
      
    }

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
    mySocket.on('news', function (data) {
      self.message = data;
      mySocket.emit('my other event', { my: 'data' });
    });
  });
