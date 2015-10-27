(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .directive('node', function () {
    
    return {
      restrict: 'E',
      replace: true,
      template: '<div>Hello, world!</div>',
      
      link: function (scope, el, attr) {
      
      // Todo     
        
      }
    };
  });
  
})(angular);