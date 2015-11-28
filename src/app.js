'use strict';

angular.module('bebop', [
  
  // Bebop!
  'bebop.config',
  'bebop.auth',
  'bebop.utilities',
  'bebop.nodes',
  'bebop.rooms',
  'bebop.notifications',
  
  // Third-party
  'ngMaterial',
  'btford.markdown'
  
]);

// .run(['$rootScope', 'firebaseService', function ($rootScope, firebaseService) {

//   var $ref = firebaseService.getRef();
  
//   $ref.onAuth(function(authData) {
//     $rootScope.signedIn = !!authData;
//   });
  
// }]);