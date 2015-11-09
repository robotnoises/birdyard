(function (angular) {
  
  'use strict';
  
  var shiftPressed = false;
  
  angular.module('bebop.utilities')
  
  .directive('shiftEnter', function () {
    
    return function (scope, element, attrs) {
    
      // Bind keydown events
      element.bind('keydown', function (e) {
        
        var key = e.keyCode || e.charCode;
        
        // If the key is shift     
        if (key == 16) {
          shiftPressed = true;
        } else if (key === 13 && shiftPressed) {
          // If the key is enter, and the last key was shift
          scope.$apply(function () {
            // evaluate whatever function was passed-in
            scope.$eval(attrs['shiftEnter']);
          });
        }
      });
      
      // Bind keyup events
      element.bind('keyup', function (e) {
        
        var key = e.keyCode || e.charCode;
        
        // If the released key is shift     
        if (key == 16) {
          shiftPressed = false;
        } 
      });
    }
  });
  
})(angular);