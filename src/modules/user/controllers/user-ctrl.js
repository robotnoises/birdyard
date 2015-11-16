(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('userController', ['$scope', '$timeout', '$routeParams', 'firebaseService', 'authService', 'uiService', '$mdToast',
  
  function ($scope, $timeout, $routeParams, firebaseService, authService, uiService, $mdToast) {
    
    // Globals
    
    var _userId = $routeParams.userid;
    var _user = {};
    
    // Scope
    
    $scope.user = {};
    $scope.loaded = false;
    $scope.modified = false;
    $scope.editable = typeof _userId === 'undefined';
    
    authService.getUser(_userId).then(function ($user) {
      _user = angular.copy($user);
      $timeout(function () {
        $scope.user = $user;
        $scope.loaded = true;  
      });
    }).catch(function (err) {
      console.log(err);
    });

    // Private 
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
    // Watchers
    
    // Watch to see if the user's display name gets modified
    $scope.$watch('user.name', function(name) {
      $timeout(function () {
        $scope.modified = (name && name !== _user.name);
      });
    });
    
    // Watch to see if the user's description gets modified
    $scope.$watch('user.description', function(description) {
      $timeout(function () {
        $scope.modified = (description !== _user.description);  
      });
    });
    
    // Public
    
    $scope.saveUser = function () {
      authService.updateUser($scope.user).then(function () {
        $timeout(function () {
          
          _user = angular.copy($scope.user);
          $scope.modified = false;
          
          // Display success message
          $mdToast.show(
            $mdToast.simple()
            .content('Saved!')
            .theme('toast-success')
            .position('bottom right')
            .hideDelay(3000)
          );
          
        });
      }).catch(function (err) {
        // Display error message
        $mdToast.show(
          $mdToast.simple()
            .content('Something went wrong!')
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
      });
    };
    
  }]);
  
})(angular);