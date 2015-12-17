(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('scrollable', ['$window', '$firebaseArray', function($window, $firebaseArray) {
    return function(ref, field) {
      
      // create a special scroll ref
      var scrollRef = new $window.Firebase.util.Scroll(ref, field);
      // generate a synchronized array with the ref
      var list = $firebaseArray(scrollRef);
      // store the scroll namespace on the array for easy ref
      list.scroll = scrollRef.scroll;
      
      return list;
    }
  }]);
  
})(angular);

