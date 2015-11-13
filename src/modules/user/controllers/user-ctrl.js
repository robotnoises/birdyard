(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('userController', ['$scope', '$timeout', 'firebaseService', 'authService', 'uiService',
  
  function ($scope, $timeout, firebaseService, authService, uiService) {
    
    // Globals
    
    var _user = {};
    
    // Scope
    
    $scope.user = {};
    $scope.loaded = false;
    $scope.modified = false;
    
    authService.getUser().then(function ($user) {
      $scope.user = $user;
      $scope.loaded = true;
      _user = angular.copy($user);
    }).catch(function (err) {
      console.log(err);
    });

    // Private 
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
    // Watch to see if the user object gets modified
    $scope.$watch('user.name', function(name) {
      
      if (!name) return;
      
      $timeout(function () {
        $scope.modified = (name !== _user.name);
      });
    });
    
    // Public
    
    $scope.saveUser = function () {
      authService.updateUser($scope.user).then(function () {
        $timeout(function () {
          _user = angular.copy($scope.user);
          $scope.modified = false;  
        });
      });
    };
    
  }]);
  
})(angular);