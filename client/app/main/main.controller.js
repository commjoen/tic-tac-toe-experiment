angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket) {
    var self = this;

    self.message = '';

    mySocket.on('news', function (data) {
      console.log(data);
      self.message = data;
      mySocket.emit('my other event', { my: 'data' });
    });
  });
