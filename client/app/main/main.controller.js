angular.module('ticTacToeExperimentApp')
  .controller('MainCtrl', function ($scope, mySocket, $famous, $timeout){
    var self = this;

    self.state = 'init';

    self.colorX = 'green';
    self.colorO = 'red';

    self.gameState = {};

    self.renderedGameState = [];

    self.renderGameState = function (){
      self.renderedGameState = [];
      angular.forEach(self.gameState.grid, function (value){
        angular.forEach(value, function (value){
          self.renderedGameState.push(value);
        });
      });
      $timeout( function() {if(self.gameState.winner !== undefined) alert("WE HAVE A WINNER!")}, 20);      
    };
    self.message = '';

    self.renderGameState();

    self.joinGame = function (playerName){
      self.state = 'joined';

      mySocket.emit('join', playerName);

      mySocket.on('stateUpdated', function (state){
        self.gameState = state;
        self.renderGameState();
        console.log(state);
        if (self.gameState.turn === 'x') {
          self.colorX = 'green';
          self.colorO = 'red';
        } else {
          self.colorX = 'red';
          self.colorO = 'green';
        }
      });
    }

    self.positionFree = function(x, y) {
      return self.gameState.grid[x][y] == null;
    }

    self.makeMove = function(index) {
      // TODO Get coords
      var x = Math.floor(index / 3);
      var y = index - 3*x;

      if( self.positionFree(x,y) ) {
         mySocket.emit('move', {
            x: x,
            y: y
         });
       }     
    }
  });
