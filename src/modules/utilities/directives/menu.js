(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .directive('menu', [
    '$rootScope', 
    '$location',
    '$timeout',
    'authService',
    'firebaseService',
    '$mdToast',
    '$mdSidenav',
    
    function (
      $rootScope, 
      $location,
      $timeout,
      authService,
      firebaseService,
      $mdToast,
      $mdSidenav
    ) {
    
    return {
      restrict: 'E',
      replace: true,
      template: 
      '<div class="birdyard-menu-wrapper">' +
        
        '<div class="birdyard-btn pointer" ng-hide="signedIn" ng-click="signIn()">Sign in with Twitter</div>' + 
        
        '<div ng-if="signedIn" class="birdyard-btn pointer" style="padding-bottom: 0; height: 33px; width: 33px; text-align: center;" ng-click="toggleMenu()">' + 
          '<i class="icon fa fa-navicon menu" ng-if="notificationCount == 0" style="font-size: 18px;"></i>' + 
          '<i class="icon fa fa-bell co-yellow menu ding" ng-if="notificationCount > 0" ng-class="{\'ring\': ring}" style="font-size: 18px; text-shadow: 0px 1px 0px rgba(0,0,0,0.5)"></i>' +
        '</div>' +

        '<div class="birdyard-menu" ng-class="{show: showing}" ng-click="close()">' +
          '<div class="birdyard-menu-item pointer" ng-click="goTo(\'/user\')">View Your Profile</div>' +
          '<div class="birdyard-menu-item pointer" ng-click="toggleNotifications()">Notifications <span class="pill-mini weight-bold" ng-class="{\'bg-grey co-black\': notificationCount == 0}">{{notificationCount}}</span></div>' +
          '<div class="birdyard-menu-item pointer" ng-click="goTo(\'/rooms/new\')">Make a New Room</div>' +
          '<div class="birdyard-menu-item pointer">Get Help</div>' +
          '<div class="birdyard-menu-item pointer">Legal Stuff</div>' +
          
          '<div class="birdyard-menu-footer">' +
            '<avatar class="birdyard-avatar"></avatar>' +
            '<span class="birdyard-btn pointer float-right" style="border-width: 2px;" ng-click="signOut()">' +
              'SIGN OUT' + 
            '</span>' + 
          '</div>' +
        '</div>' +  
      '</div>',
      
      link: function (scope, element, attrs) {
        
        scope.showing = false;
        scope.ring =    false;
        
        $rootScope.$on('notification', function ($event, count) {
          if (count) {
            // Ring the bell!!!!!!
            scope.ring = true;
            $timeout(function () {
              scope.ring = false;
            }, 5000);
          }
        });
        
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
        
        scope.toggleNotifications = function () {
          $mdSidenav('notifications-nav').toggle();
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