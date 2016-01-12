(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.users')
  
  .controller('authController', ['$scope', '$location', '$rootScope', 'firebaseService', 'authService', 'uiService',
  
  function ($scope, $location, $rootScope, firebaseService, authService, uiService) {
    
    // Private
    
    function init() {
      // Set immediately
      authService.getAvatar().then(function(url) {
        $scope.avatarUrl = url;
      });
      
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    function signIn() {
      var $ref = firebaseService.getRef();

      $ref.authWithOAuthPopup('twitter', function(error, authData) { 
        if (error) {
          console.error(error);
        } else {
          authService.signIn(authData).then(function () {
          angular.element(document.getElementById('text-input')).focus();
          }).catch(function (error) {
            console.error(error);
          });
        }
      });
    }
    
    // Public
    
    $scope.signOut = function () {
      authService.signOut();
    };
    
    $scope.goToProfile = function () {
      $location.path('/user')
    };
    
    $scope.goToNewRoom = function () {
      if ($rootScope.signedIn) {
        $location.path('/rooms/new');
      } else {
        signIn();
      }
    };
    
    init();
    
  }]);
  
})(angular);