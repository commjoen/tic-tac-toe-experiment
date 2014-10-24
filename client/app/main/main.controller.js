angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope) {
    var self = this;

    self.message = 'boo';

    var socket = io.connect('http://localhost');
    socket.on('news', function (data) {
      console.log(data);
      self.message = data;
      $scope.$digest();
      socket.emit('my other event', { my: 'data' });
    });
  });
