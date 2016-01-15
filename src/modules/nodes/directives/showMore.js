(function (angular) {
  
  'use strict';
  
  // Private
  
  function textOverflow(element) {
    return element.clientHeight < element.scrollHeight;
  }
  
  angular.module('birdyard.nodes')
  
  .directive('showMore', ['$timeout', '$compile', function ($timeout, $compile) {
    
    return {
      restrict: 'A',
      replace: false,
      scope: {
        loaded: '@'
      },
      link: function (scope, element, attrs) {
        scope.$watch('loaded', function (loaded) {
          if (loaded === 'false') { 
            return;
          } else {
            $timeout(function () {
              var expand = textOverflow(element[0]);
              if (expand) {
                scope.$parent.$eval(attrs['showMore']);
              }  
            }, 100);
          }
        });
      }
    }
  }]);
  
})(angular);