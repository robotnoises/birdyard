(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .directive('node', ['$timeout', '$location', function ($timeout, $location) {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/nodes/views/node.html',
      scope: {
        node: '=',
        select: '=',
        pause: '='
      },
      link: function (scope, element, attrs) {
        
        // Scope methods
        
        scope.goToProfile = function (uid) {
          $location.path('user/' + uid);
        };
        
        scope.favd = false;
        
        scope.fav = function () {
          scope.favd = !scope.favd;
        }; 
      }
    }
  }]);
  
})(angular);