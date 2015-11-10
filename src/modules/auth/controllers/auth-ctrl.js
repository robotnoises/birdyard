(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('authController', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    
    $scope.signIn = function (provider) {
      
      var $ref = firebaseService.getRef();
      
      $ref.authWithOAuthPopup(provider, function(error, authData) { 
        if (error) {
          console.error(error);
        } else {
          $ref.child('users').child(authData.uid).set(authData);
        }
      });
      
    };
    
    $scope.signOut = function () {
      var $ref = firebaseService.getRef();
      $ref.unauth();
    };
    
  }]);
  
})(angular);