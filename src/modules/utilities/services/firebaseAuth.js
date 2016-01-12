(function (angular) {
  
  'use strict';
  
  angular.module('birdyard')
  
  .factory('$Auth', ['$firebaseAuth', 'firebaseService', function($firebaseAuth, firebaseService) {
    return $firebaseAuth(firebaseService.getRef());
  }]);
  
})(angular);