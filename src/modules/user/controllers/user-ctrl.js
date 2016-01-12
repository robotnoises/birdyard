(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.users')
  
  .controller('userController', ['$scope', '$timeout', '$routeParams', '$location', 'firebaseService', 'authService', 'uiService', 'colorService', '$mdToast',
  
  function ($scope, $timeout, $routeParams, $location, firebaseService, authService, uiService, colorService, $mdToast) {
    
    // Globals
    
    var _userId = $routeParams.userid;
    var _user = {};
    
    // Scope
    
    $scope.user = {};
    $scope.loaded = false;
    $scope.modified = false;
    $scope.editable = typeof _userId === 'undefined';
    $scope.accentColors = colorService.list;
    $scope.showLightbox = false;
    
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
      uiService.setBackgroundClass('');
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
    
    // Watch accent color
    $scope.$watch('user.accent', function(accent) {
      $timeout(function () {
        $scope.modified = (accent !== _user.accent);  
      });
    });
    
    // Watch public social media handle
    
    // Watch accent color
    $scope.$watch('user.social', function(social) {
      $timeout(function () {
        $scope.modified = (social !== _user.social);  
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
            .content('Something went wrong, please try again.')
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
      });
    };
    
    $scope.signOutUser = function () {
      return authService.signOut().then(function () {
        return $mdToast.show(
          $mdToast.simple()
            .content('Signed out!')
            .theme('toast-default')
            .position('bottom right')
            .hideDelay(1000)
          );
      });
    };
    
  }]);
  
})(angular);