(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
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
      '<div class="birdyard-menu-wrapper">' +
        
        '<md-button class="birdyard-menu-btn" ng-hide="signedIn" ng-click="signIn()">Sign in with Twitter</md-button>' + 
        
        '<div ng-if="signedIn" class="birdyard-avatar-sm pointer" ng-click="toggleMenu()">' + 
          '<avatar></avatar>' + 
        '</div>' +

        '<div class="birdyard-menu shadow-soft" ng-class="{show: showing, pointer: showing}" ng-click="close()">' +
          '<div class="birdyard-menu-item" ng-click="goTo(\'/user\')">Profile</div>' +
          '<div class="birdyard-menu-item">Hello World</div>' +
          '<div class="birdyard-menu-item">Butts butts butts</div>' +
          '<div class="birdyard-menu-item">aaaaaaaaaa</div>' +
          '<div class="birdyard-menu-item" ng-click="signOut()">Sign Out</div>' +
        '</div>' +
      '</div>',
      link: function (scope, element, attrs) {
        
        scope.showing = false;
        
        scope.toggleMenu = function () {
          if ($rootScope.signedIn) {
            scope.showing = !scope.showing;
          }
        };
        
        scope.close = function () {
          if (scope.showing) {
            scope.showing = false;
          }
        }
        
        scope.goTo = function (loc) {
          if (scope.showing) {
            $location.path(loc);  
          }
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
          
          if (!scope.showing) return;
          
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