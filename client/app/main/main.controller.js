'use strict';

angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, $http) {
    var self =this;


    $http.get('/api/things').success(function(awesomeThings) {
      self.awesomeThings = awesomeThings;
    });

  });
