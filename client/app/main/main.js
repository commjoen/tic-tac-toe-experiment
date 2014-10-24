'use strict';

angular.module('ticTacToeExperimentApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/d3', {
        templateUrl: 'app/main/tttd3.html',
        controller: 'TTTd3Ctrl'
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      });
  });
