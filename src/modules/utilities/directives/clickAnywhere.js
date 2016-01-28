(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .directive('clickAnywhere', ['$rootScope', function($rootScope) {
        
    return {
      restrict: 'E',
      replace: true,
      scope: {
        z: '=',
        action: '=',
        active: '='
      },
      template: '<div class="backdrop" ng-style="{\'zIndex\': z}" ng-class="{\'active\': active}" ng-click="handleClick()"></div>',
      link: function (scope, element, attrs) {
        
        scope.z = scope.z || 1;
        
        // Private
        
        function hide() {
          $rootScope.backdropClick = function () {
            console.warn('Birdyard Warning: You have not assigned a callback to handle the click-anywhere \'click\' event');
            return;
          };          
          $rootScope.backdropZIndex = 1;
          $rootScope.backdropActive = false;
        }
        
        // Public
        
        scope.handleClick = function () {
          if (typeof scope.action === 'function') {
            scope.action();
            hide();
          } else {
            throw new Error('Birdyard: click-anywhere action must be a function');
          }
        };
      }
    }
  }]);
  
})(angular);
