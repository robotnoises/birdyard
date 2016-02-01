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
    'backdropService',
    
    function (
      $rootScope, 
      $location,
      $timeout,
      authService,
      firebaseService,
      $mdToast,
      $mdSidenav,
      backdropService) {
    
    return {
      restrict: 'E',
      replace: true,
      template: 
      '<div class="birdyard-menu-wrapper">' +
        
      ' <div class="birdyard-btn pointer" ng-hide="signedIn" ng-click="signIn()">Sign in with Twitter</div>' + 
        
      ' <div ng-if="signedIn" class="birdyard-btn pointer" style="padding-bottom: 0; height: 33px; width: 33px; text-align: center; overflow: hidden;" ng-click="toggleMenu()">' + 
      '   <i class="icon fa fa-navicon menu" ng-if="!notificationCount && !ring" style="font-size: 20px;"></i>' + 
      '   <i class="icon fa fa-bell co-yellow menu ding" ng-if="notificationCount" ng-class="{\'ring\': ring}" style="font-size: 20px; text-shadow: 0px 1px 0px rgba(0,0,0,0.5);"></i>' +
      ' </div>' +

      ' <div class="birdyard-menu" ng-class="{show: showing}" ng-click="close()">' +
      '   <div class="birdyard-menu-item pointer" ng-click="goTo(\'/\')"><i class=\'fa fa-home co-yellow\'></i> Go Home</div>' +
      '   <div class="birdyard-menu-item pointer" ng-click="goTo(\'/user\')"><i class=\'fa fa-eye co-red\'></i> View Your Profile</div>' +
      '   <div class="birdyard-menu-item pointer" ng-click="goTo(\'/rooms/new\')"><i class=\'fa fa-comments co-green\'></i> Start a new Conversation</div>' +
      '   <div class="birdyard-menu-item pointer" ng-click="toggleNotifications()"><i class=\'fa fa-bell co-orange\'></i> Notifications <span class="pill-mini weight-bold" ng-class="{\'bg-verylightgrey co-black\': notificationCount == 0}">{{notificationCount}}</span></div>' +
      '   <div class="birdyard-menu-item pointer"><i class=\'fa fa-mortar-board co-blue\'></i> Get Help</div>' +
      '   <div class="birdyard-menu-item pointer"><i class=\'fa fa-institution co-purple\'></i> Legal Stuff</div>' +
      '   <div class="birdyard-menu-footer birdyard-btn pointer" ng-click="signOut()">' +
      '       SIGN OUT' + 
      '   </div>' +
      ' </div>' +  
      '</div>',
      
      link: function (scope, element, attrs) {
        
        scope.showing = false;
        scope.ring =    false;
        
        // Private
        
        function clickToClose() {
          backdropService.set(true, 4, scope.toggleMenu);
        }
        
        // Event Listeners
        
        $rootScope.$on('notification', function ($event, count) {
          if (count && !scope.ring) {
            // Ring the bell!!!!!!
            scope.ring = true;
            $timeout(function () {
              scope.ring = false;
            }, 3000);
          }
        });
        
        // Public
        
        scope.toggleMenu = function () {
          if ($rootScope.signedIn) {
            scope.showing = !scope.showing;
            clickToClose();
          }
        };
        
        scope.close = function () {
          if (scope.showing) {
            scope.showing = false;
            backdropService.reset();
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