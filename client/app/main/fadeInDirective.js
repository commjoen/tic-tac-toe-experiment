angular.module('ticTacToeExperimentApp')
.directive('fadeIn',
  ['$famous', '$famousDecorator', '$timeout',
    function ($famous, $famousDecorator, $timeout) {
      return {
        restrict: 'A',
        scope: false,
        priority: 16,
        compile: function(tElement, tAttrs, transclude) {
          var Transitionable = $famous['famous/transitions/Transitionable'];
          return {
            pre: function(scope, element, attrs) {
            },
            post: function(scope, element, attrs) {
              $famousDecorator.ensureIsolate(scope)

              $timeout(function() {
                var opacityStartValue = attrs.faOpacity;
                var opacityEndValue = attrs.opacityEnd;
                var duration = attrs.duration;

                var opacityTransitionable = new Transitionable(opacityStartValue);

                scope.isolate[scope.$id].modifier.opacityFrom(function() {
                  return opacityTransitionable.get();
                });

                opacityTransitionable.set(opacityEndValue, {duration: duration, curve: 'easeInOut'});
              });

            }
          }
        }
      }
    }]);