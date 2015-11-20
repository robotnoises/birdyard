(function (angular) {
  
  'use strict';
  
  angular.module('bebop.notifications')
  
  .directive('notifications', function () {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/notifications/views/notifications.html',
      controller: ['$scope', '$location', '$timeout', 'notificationService', '$mdSidenav', 
      
      function ($scope, $location, $timeout, notificationService, $mdSidenav) {
        
        $scope.notifications = {};
        $scope.count = 0;
        
        notificationService.get().then(function ($notifications) {
          return $notifications.$loaded(function ($loaded) {
            $scope.notifications = $loaded;
            $scope.count = angular.copy($loaded.length);
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
        
        $scope.go = function (id) {
          dismiss(id);
          toggle();
          $timeout(function () {
            $location.path('/n/' + id);
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