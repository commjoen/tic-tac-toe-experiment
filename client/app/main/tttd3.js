var app = angular.module('ticTacToeExperimentApp');

app.controller('TTTd3Ctrl', ['$scope','$interval', function($scope, $interval){

    $scope.gameState = {
      grid: [
        ['', 'x', ''],
        ['o', '', 'x'],
        ['', 'o', 'x']
      ],
      x: 'nameplayer1',
      o: 'nameplayer2',
      turn: 'o'};
}]);

app.directive('grid', function($parse, $window){

   function toCircleXY(pos) {
     return (50 + pos * 100);
   }

   function toCrossXY(pos) {
     return 100 + (pos * 100);
   }

   return{
      restrict:'EA',
      template:"<svg width='300' height='300'></svg>",
        link: function(scope, elem, attrs) {
          
          var exp = $parse(attrs.gridData);
          var gridData = exp(scope);
          var d3 = $window.d3;
          var rawSvg = elem.find('svg');
          var svg = d3.select(rawSvg[0]);

          var x = d3.scale.identity().domain([0,300]);
          var y = d3.scale.identity().domain([0,300]);

          svg.selectAll("line.x")
            .data(x.ticks(3))
            .enter().append("line")
            .attr("class", "x")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", 300)
            .style("stroke", "#ccc"); 
          
          svg.selectAll("line.y")
            .data(y.ticks(3))
            .enter().append("line")
            .attr("class", "y")
            .attr("x1", 0)
            .attr("x2", 300)
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke", "#ccc"); 

          var circleData = [];
          for(var y=0; y<3; y++) {
            for(var x=0; x<3; x++) {
              if(gridData[y][x] === "o") {
                circleData.push({x: toCircleXY(x), y: toCircleXY(y)})
              }
            }
          }
 
          var circles = svg.selectAll("circle")
              .data(circleData)
              .enter()
              .append("circle");

          var circleAttributes = circles
             .attr("cx", function (d) { return d.x; })
             .attr("cy", function (d) { return d.y; })
             .attr("r", 30)
             .style("fill", "purple");

          var crossData = [];
          for(var y=0; y<3; y++) {
            for(var x=0; x<3; x++) {
              if(gridData[y][x] === "x") {
                crossData.push({x: toCrossXY(x), y: toCrossXY(y)})
              }
            }
          }

          var cross_shape = function(cross) {
            var points = [ [cross.x,cross.y], [cross.x - 100, cross.y - 100], [cross.x - 50, cross.y - 50], [cross.x, cross.y - 100], [cross.x -100, cross.y]];
            return d3.svg.line()(points);
          };
             
          svg.selectAll("path")
              .data(crossData).enter().append("svg:path")
              .attr("d", cross_shape)
              .attr("stroke", "green")
              .attr("stroke-width", 2)
              .attr("fill", "none");
        }
   };
});     
