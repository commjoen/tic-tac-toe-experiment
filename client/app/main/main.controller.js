angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket) {
    var self = this;

    self.gameState = {
      'grid': [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9']
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
    mySocket.on('news', function (data) {
      self.message = data;
      mySocket.emit('my other event', { my: 'data' });
    });
  });
