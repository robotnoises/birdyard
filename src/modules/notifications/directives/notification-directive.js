(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.notifications')
  
  .directive('notifications', function () {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/notifications/views/notifications.html',
      controller: ['$rootScope', '$scope', '$location', '$timeout', 'notificationService', '$mdSidenav', 
      
      function ($rootScope, $scope, $location, $timeout, notificationService, $mdSidenav) {
        
        $scope.notifications = {};
        
        $rootScope.freeze = false;
        $rootScope.notificationCount = 0;
        
        $scope.TYPE = notificationService.TYPE; 
        
        notificationService.get().then(function ($notifications) {
          return $notifications.$loaded(function ($snap) {
            $scope.notifications = $snap;
            updateCount(angular.copy($snap.length));
            watch();
          })
        }).catch(function (err) {
          console.log(err);
        });
        
        // Watchers
        
        // Keeps tabs on whether or not the sidenav is open
        // https://github.com/angular/material/issues/3179
        
        $scope.$watch(
            function() { return $mdSidenav('notifications-nav').isOpen(); },
            function(value) {
              var isOpen = value || false;
              $rootScope.freeze = isOpen;
            }
        );
        
        // Private
                
        function toggle() {
          $rootScope.freeze = !$rootScope.freeze;
          $mdSidenav('notifications-nav').toggle();
        }
        
        function updateCount (count) {
          
          if (count > $rootScope.notificationCount) {
            $rootScope.$emit('notification', count);
          }
          
          $timeout(function() {
            $rootScope.notificationCount = count;
          });
        }
        
        $scope.ring = false;
        
        function watch() {
          $scope.notifications.$watch(function ($event) {
            if ($event) {
              var newCount = angular.copy($scope.notifications.length);
              if (newCount === $rootScope.notificationCount) {
                return;
              } else {
                updateCount(angular.copy($scope.notifications.length));  
              }
            }
          });
        }
        
        function dismiss(id) {
          notificationService.read(id).catch(function (err) {
            console.error(err);
          });
        }

        // Public
        
        $scope.openNav = function () {
          toggle();
        };
        
        $scope.go = function (noti) {
          dismiss(noti.id);
          toggle();
          $timeout(function () {
            $location.path(noti.location);
          }, 300);
        };
        
        $scope.dismiss = dismiss;
        
        $scope.dismissAll = function (id) {
          toggle();
          notificationService.readAll().catch(function (err) {
            console.log(err);
          });
        };
        
      }]
    }
  });
  
})(angular);