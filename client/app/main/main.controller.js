angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope) {
    var self = this;

    self.gameState = {
      'grid': [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9']
      ],
      'x': 'nameplayer1',
      'o': 'nameplayer2',
      'turn': 'x'
    };

    self.renderedGameState = [];

    self.renderGameState = function () {
      angular.forEach(self.gameState.grid, function (value) {
        angular.forEach(value, function (value) {
          self.renderedGameState.push(value);
        });
      });
    };
    self.message = '';

    self.renderGameState();


    var swarmHost = new Swarm.Host(String(Math.random()).slice(2));
    swarmHost.connect('ws://localhost:9000/');

    // TODO import from server
    var Position = Swarm.Model.extend('Position', {
      defaults: {
        x: 0,
        y: 0
      }
    });

    var pos = new Position('cursor');
    pos.on(function (spec, val) {
      self.cursor = val;
      $scope.$digest();
    });

    $(document).mousemove(function (event) {
      pos.set({
        x: event.clientX,
        y: event.clientY
      })
    });
  });
