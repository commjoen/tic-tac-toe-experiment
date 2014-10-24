'use strict';

angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, $http) {
    var self =this;

    self.gameState = {'grid' : [["1", "2", "3"],["4", "5", "6"],["7", "8", "9"]],
    'x': 'nameplayer1',
    'o': 'nameplayer2',
    'turn': 'x'};

    $http.get('/api/things').success(function(awesomeThings) {
      self.awesomeThings = awesomeThings;
    });

  });
