(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .factory('scrollable', ['$window', '$firebaseArray', function($window, $firebaseArray) {
    return function(ref, field) {
      // Create a special scroll ref
      var $scrollRef = new $window.Firebase.util.Scroll(ref, field);
      // Generate a synchronized array with the ref
      var list = $firebaseArray($scrollRef);
      // Store the scroll namespace on the array for easy ref
      list.scroll = $scrollRef.scroll;
      
      return list;
    }
  }]);
  
})(angular);

