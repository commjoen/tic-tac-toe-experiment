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

    self.message = '';

    mySocket.on('news', function (data) {
      self.message = data;
      mySocket.emit('my other event', { my: 'data' });
    });
  });
