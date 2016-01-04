(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .directive('escape', function () {
    
    return function (scope, element, attrs) {
    
      // Bind keydown events
      element.bind('keydown', function (e) {
        
        var key = e.keyCode || e.charCode;
        
        // If the key is escape     
        if (key === 27) {
          scope.$apply(function () {
            // evaluate whatever function was passed-in
            scope.$eval(attrs['escape']);
          });
        }
      });
    }
  });
  
})(angular);