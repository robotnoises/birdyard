(function (angular) {
  
  'use strict';
  
  angular.module('bebop')
  
  .factory('$Auth', ['$firebaseAuth', 'firebaseService', function($firebaseAuth, firebaseService) {
    return $firebaseAuth(firebaseService.getRef());
  }]);
  
})(angular);