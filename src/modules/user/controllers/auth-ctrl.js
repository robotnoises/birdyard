(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('authController', ['$scope', '$location', 'firebaseService', 'authService', 
  
  function ($scope, $location, firebaseService, authService) {
    
    // Private
    
    function init() {
      // Set immediately
      authService.getAvatar().then(function(url) {
        $scope.avatarUrl = url;
      });
    }
    
    // Public
    
    $scope.signIn = function (provider) {

      var $ref = firebaseService.getRef();

      $ref.authWithOAuthPopup(provider, function(error, authData) { 
        if (error) {
          console.error(error);
        } else {
          authService.signIn(authData);
        }
      });
    };
    
    $scope.signOut = function () {
      authService.signOut();
    };
    
    $scope.goToProfile = function () {
      $location.path('/user')
    };
    
    init();
    
  }]);
  
})(angular);