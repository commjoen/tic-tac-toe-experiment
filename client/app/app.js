'use strict';

angular.module('ticTacToeExperimentApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }).
  factory('mySocket', function (socketFactory) {
    return socketFactory();
  });
