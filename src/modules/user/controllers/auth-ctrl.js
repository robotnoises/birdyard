(function (angular) {
  
  'use strict';
  
  angular.module('bebop.users')
  
  .controller('authController', ['$scope', '$location', 'firebaseService', 'authService', 'uiService',
  
  function ($scope, $location, firebaseService, authService, uiService) {
    
    // Private
    
    function init() {
      // Set immediately
      authService.getAvatar().then(function(url) {
        $scope.avatarUrl = url;
      });
      
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    // Public
    
    $scope.signOut = function () {
      authService.signOut();
    };
    
    $scope.goToProfile = function () {
      $location.path('/user')
    };
    
    init();
    
  }]);
  
})(angular);