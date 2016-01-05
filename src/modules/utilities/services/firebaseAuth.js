(function (angular) {
  
  'use strict';
  
  angular.module('bbop')
  
  .factory('$Auth', ['$firebaseAuth', 'firebaseService', function($firebaseAuth, firebaseService) {
    return $firebaseAuth(firebaseService.getRef());
  }]);
  
})(angular);