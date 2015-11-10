'use strict';

angular.module('bebop', [
  
  // Bebop!
  'bebop.config',
  'bebop.utilities',
  'bebop.nodes',
  'bebop.auth',
  
  // Third-party
  'ngMaterial'
  
]).run(['$rootScope', 'firebaseService', function ($rootScope, firebaseService) {
  var $ref = firebaseService.getRef();
  
  $ref.onAuth(function(authData) {
    $rootScope.signedIn = !! authData;
  });
}]);