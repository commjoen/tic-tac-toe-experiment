'use strict';

angular.module('ticTacToeExperimentApp', [
  'famous.angular',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
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
