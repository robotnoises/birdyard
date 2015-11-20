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
        // $scope.count = 0;
        
        notificationService.get().then(function ($notifications) {
          return $notifications.$loaded(function ($loaded) {
            $scope.notifications = $loaded;
            // $scope.count = angular.copy($loaded.length);
            // watch();
          })
        }).catch(function (err) {
          console.log(err);
        });
        
        // Private
        
        // function watch() {
        //   $scope.notifications.$watch(function ($event) {
        //     if ($event) {
        //       console.log($event);
        //     }
        //   });
        // }

        // Public
        
        $scope.openNav = function () {
          $mdSidenav('foo').toggle();
        };
        
        $scope.go = function (id) {
          // todo mark read
          $timeout(function () {
            $location.path('/n/' + id);
          });
        };
      }]
    }
  });
  
})(angular);