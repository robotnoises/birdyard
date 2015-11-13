(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('userController', ['$scope', 'firebaseService', 'authService', 'uiService',
  
  function ($scope, firebaseService, authService, uiService) {
    
    // Scope
    
    $scope.user = {};
    $scope.loaded = false;
    
    authService.getUser().then(function ($user) {
      $scope.user = $user;
      $scope.loaded = true;
    }).catch(function (err) {
      console.log(err);
    });
        
    // Private 
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
  }]);
  
})(angular);