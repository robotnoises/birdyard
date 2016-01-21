(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.notifications')
  
  .directive('notifications', function () {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/notifications/views/notifications.html',
      controller: ['$scope', '$location', '$timeout', 'notificationService', '$mdSidenav', 
      
      function ($scope, $location, $timeout, notificationService, $mdSidenav) {
        
        $scope.notifications = {};
        $scope.count = 0;
        $scope.ring = false;
        
        notificationService.get().then(function ($notifications) {
          return $notifications.$loaded(function ($snap) {
            $scope.notifications = $snap;
            $scope.count = angular.copy($snap.length);
            watch();
          })
        }).catch(function (err) {
          console.log(err);
        });
        
        // Private
        
        function toggle() {
          $mdSidenav('notifications-nav').toggle();
        }
        
        function watch() {
          $scope.notifications.$watch(function ($event) {
            if ($event) {
              var newCount = angular.copy($scope.notifications.length);
              if (newCount === $scope.count) {
                return;
              } else if (newCount > $scope.count) {
                // Ring the bell!
                $scope.ring = true;
                $timeout(function () {
                  $scope.ring = false;
                }, 5000);
              }
              $scope.count = angular.copy($scope.notifications.length);
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
        
        $scope.getUserName = function (uid) {
          
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