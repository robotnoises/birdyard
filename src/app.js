'use strict';

angular.module('bebop', [
  
  // Bebop!
  'bebop.config',
  'bebop.utilities',
  'bebop.nodes',
  'bebop.auth',
  'bebop.rooms',
  
  // Third-party
  'ngMaterial',
  'btford.markdown'
  
]).run(['$rootScope', 'firebaseService', function ($rootScope, firebaseService) {

  var $ref = firebaseService.getRef();
  
  $ref.onAuth(function(authData) {
    $rootScope.signedIn = !!authData;
  });
  
}]);