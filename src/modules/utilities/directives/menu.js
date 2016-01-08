(function (angular) {
  
  'use strict';
  
  angular.module('bbop.utilities')
  
  .directive('menu', [
    '$rootScope', 
    '$location', 
    'authService',
    'firebaseService',
    '$mdToast', 
    
    function (
      $rootScope, 
      $location,
      authService,
      firebaseService,
      $mdToast
    ) {
    
    return {
      restrict: 'E',
      replace: true,
      template: 
      '<div class="bbop-menu-wrapper" ng-click="toggleMenu()">' +
        '<md-button class="bbop-menu-btn" ng-hide="signedIn" ng-click="signIn()">Sign in with Twitter</md-button>' + 
        
        '<div ng-if="signedIn" class="bbop-avatar-sm pointer">' + 
          '<avatar></avatar>' + 
        '</div>' +

        '<div class="bbop-menu shadow-soft" ng-class="{show: showing}">' +
          '<div class="bbop-menu-item" ng-click="goTo(\'/user\')">Profile</div>' +
          '<div class="bbop-menu-item">Hello World</div>' +
          '<div class="bbop-menu-item">Butts butts butts</div>' +
          '<div class="bbop-menu-item">aaaaaaaaaa</div>' +
          '<div class="bbop-menu-item" ng-click="signOut()">Sign Out</div>' +
        '</div>' +
      '</div>',
      link: function (scope, element, attrs) {
        
        scope.showing = false;
        
        scope.toggleMenu = function () {
          if ($rootScope.signedIn) {
            scope.showing = !scope.showing;
          }
        };
        
        scope.goTo = function (loc) {
          $location.path(loc);
        };
        
        scope.signIn = function () {
          
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
        };
        
        scope.signOut = function () {
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
      }
    }
  }]);
  
})(angular);